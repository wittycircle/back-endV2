'use strict';

const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');
// ------------------ Little helpers ------------------
const checkUsername = (exports.checkUsername = username => {
  return db(TABLES.USERS).select('username').whereIn('username', username);
});

// ------------------ Main methods ------------------
exports.activate = token => {
  return db(TABLES.ACCOUNT_VALIDATION)
    .select('email')
    .where('token', token)
    .then(r => {
      if (!r.length) {
        return 'Bad token';
      } else {
        return Promise.all([
          db(TABLES.USERS).first('email').where('email', r[0].email),
          db(TABLES.USERS).update({ valid: 1 }).where('email', r[0].email),
          db(TABLES.ACCOUNT_VALIDATION).del().where('token', token)
        ]);
      }
    });
};
// ------------------ Social [google/facebook] ------------------
const cloudinary = require('cloudinary');
const config = require('../private');
cloudinary.config(config.cloudinary);

const upload = url => {
  const newUrl = url.split('sz=') + 200;
  return new Promise(resolve =>
    cloudinary.uploader.upload(url, result => resolve(result.secure_url), {
      width: 200,
      height: 200,
      crop: 'fill',
      format: 'jpg',
      gravity: 'face'
    })
  );
};

const wrapUrl = (rawUrl, params) => {
  return rawUrl
};

const social_helper = {
  facebook: data =>
    upload(wrapUrl(data.photos[0].value, {width: 200, height: 200})).then(result => {
      console.log('data', data);
      console.log('data.photos', data.photos);
      console.log('UPLOAD result', result);
      // return account.checkUsername(data.displayName)
      return {
        profile: {
          facebook_id: data.id,
          facebook_url: data.profileUrl,
          first_name: data.name.givenName,
          last_name: data.name.familyName,
          picture: result || data.photos[0].value
        },
        user: {
          email: data.emails[0].value,
          username:
            _.replace(data.displayName, ' ', '.') +
              Math.floor(Math.random() * 10000 + 1),
          invite_link: `${data.name.givenName.replace(
            / /g,
            ''
          )}${data.name.familyName.replace(/ /g, '')}_W${+Math.floor(
            Math.random() * 10000 + 1
          )}`
        }
      };
    }),
  google: data => {
    data = JSON.parse(data._raw);
    return upload(wrapUrl(data.image.url), {sz: 200}).then(result => {
      console.log('data', data);
      console.log('UPLOAD result', result);

      return {
        profile: {
          google_id: data.id,
          google_url: data.url,
          first_name: data.name.givenName,
          last_name: data.name.familyName,
          picture: result
        },
        user: {
          email: data.emails[0].value,
          username: _.replace(data.displayName, ' ', '.'),
          password: ''
        }
      };
    });
  }
};

const chooseOrigin = (origin, helper) => {
  let ret = {};
  if (origin == 'facebook') {
    ret.facebook_id = helper.profile.facebook_id;
    ret.facebook_url = helper.profile.facebook_url;
  } else if (origin == 'google') {
    ret.google_id = helper.profile.google_id;
    ret.google_url = helper.profile.google_url;
  }
  return ret;
};
// ------------------ VERIFY INVITE ------------------

const verifyUser = email => {
  return db(TABLES.INVITATION)
    .select('user_id')
    .where('mail_to', email)
    .then(r => {
      if (r.length) {
        return db(TABLES.INVITATION).update('status', 1).where('mail_to', email);
      }
      return null;
    });
};

const newUser = (helper, origin) => {
  const profileInsert = {
    first_name: helper.profile.first_name,
    last_name: helper.profile.last_name,
    picture: helper.profile.picture,
    network_id: 1
  },
    socialInsert = chooseOrigin(origin, helper);

  return db(TABLES.USERS).insert(helper.user).then(([id]) => {
    socialInsert.user_id = id;
    profileInsert.user_id = id;
    console.log('socialInsert', socialInsert);
    console.log('profileInsert', profileInsert);
    return Promise.all([
      db(TABLES.USER_SOCIALS).insert(socialInsert),
      db(TABLES.PROFILES).insert(profileInsert),
      verifyUser(helper.user.email),
      db(TABLES.RANK).insert({ user_id: id, rank: id }),
      db(TABLES.RANK_POINTS).insert({ user_id: id, points: 300 })
    ]).then(r => {
      return {
        id: id,
        email: helper.user.email
      };
    });
  });
};

const modifyUser = (helper, origin, user) => {
  let u_obj = chooseOrigin(origin, helper);
  console.log('user', user);
  return db(TABLES.USER_SOCIALS)
    .update(u_obj)
    .where({ user_id: user.id })
    .then(r => {
      return {
        id: user.id,
        email: helper.user.email
      };
    });
};

exports.socialRegister = (data, origin) => {
  console.log('DATA SOCIAL REGISTER', data);
  return social_helper[origin](data).then(helper => {
    return db(TABLES.USERS)
      .first(['id'])
      .where({ email: helper.user.email })
      .then(r => {
        if (r) {
          return modifyUser(helper, origin, r);
        } else {
          return newUser(helper, origin);
        }
      });
  });
};

// ------------------ Main methods ------------------

//helpers register

const permission = id => {
  return db.batchInsert(TABLES.NOTIF_PERM, [
    { notif_type: 'profile_view', user_id: id },
    { notif_type: 'user_follow', user_id: id },
    { notif_type: 'follow_project', user_id: id },
    { notif_type: 'feedback', user_id: id },
    { notif_type: 'ask_project', user_id: id },
    { notif_type: 'reply_project', user_id: id },
    { notif_type: 'new_message', user_id: id }
  ]);
};

exports.register = (data, token) => {
  console.log('data', data);
  let profile_data = {
    first_name: data.first_name,
    last_name: data.last_name,
    loc_id: 1,
    network_id: 1
  },
    user_data = {
      email: data.email,
      password: data.password,
      username: data.username,
      invite_link: `${data.first_name.replace(/ /g, '')}${data.last_name.replace(
        / /g,
        ''
      )}_W${+Math.floor(Math.random() * 10000 + 1)}`
    };

  return Promise.all([
    h.exist(TABLES.USERS, data.email, 'email'),
    h.exist(TABLES.USERS, data.username, 'username')
  ]).then(([r, r2]) => {
    if (r.length || r2.length) {
      throw r.length ? 'Email already taken' : 'username already taken';
    } else {
      return db(TABLES.USERS).insert(user_data).then(user => {
        profile_data.user_id = user[0];
        return Promise.all([
          db(TABLES.PROFILES).insert(profile_data),
          verifyUser(data.email),
          permission(user[0]),
          db(TABLES.USER_SOCIALS).insert({ user_id: user[0] }),
          db(TABLES.RANK).insert({ user_id: user[0], rank: user[0] }),
          db(TABLES.RANK_POINTS).insert({ user_id: user[0], points: 300 }),
          db(TABLES.ACCOUNT_VALIDATION).insert({
            email: data.email,
            token: token
          })
        ]).then(allR => {
          console.log('allR', allR);
          return db(TABLES.USERS)
            .select('id')
            .where('id', user[0])
            .then(r => [r, allR[1]]);
        });
      });
    }
  });
};

exports.resetPassword = (token, password) => {
  return db(TABLES.RESET_PASSWORDS)
    .first('id')
    .where({ token: token })
    .then(r => {
      if (!r) throw 'bad token';
      else {
        return db(TABLES.USERS).update({ password }).where('id', r.id);
      }
    });
};

exports.recoverPassword = (email, token) => {
  return db(TABLES.USERS).first('id').where('email', email).then(user => {
    if (!user) return 'Invalid email';
    else {
      return db(TABLES.RESET_PASSWORDS).insert({
        email: email,
        user_id: user.id,
        token: token
      });
    }
  });
};

exports.updatePassword = (password, uid) => {
  return h.exist(TABLES.USERS, uid).then(r => {
    if (!r.length) return 'bad user id';
    else {
      return db(TABLES.USERS).update({ password: password }).where({ id: uid });
    }
  });
};

exports.updateInformations = (data, uid) => {
  return h.exist(TABLES.USERS, uid).then(r => {
    if (!r.length) return 'bad user id';
    else {
      return db(TABLES.USERS).update(data).where({ id: uid });
    }
  });
};
