const _ = require('lodash'), user_list = require('./data/users_data');
// location_list = require('./data/location_data');

const getUsers = (db, old) => {
  let users = {};
  let old_u = old('users').select('id');
  let new_u = db('users').select('id');
  return Promise.all([old_u, new_u]).then(([r, rr]) => {
    let l = r.length;
    for (let i = 0; i < l; i++) {
      let k = r[i].id;
      let v = rr[i].id;
      users[k] = v;
    }
    return users;
  });
};

const getMatchingId = (db, old, table) => {
  let data = {};
  let old_u = old(table).select('id').orderBy('id');
  let new_u = db(table).select('id').orderBy('id');
  return Promise.all([old_u, new_u]).then(([r, rr]) => {
    let l = r.length;
    for (let i = 0; i < l; i++) {
      let k = r[i].id;
      let v = rr[i].id;
      data[k] = v;
    }
    return data;
  });
};

const getInterests = (db, old) => {
  let interests = {};
  let new_interests = db('interests').select('id', 'name');
  let old_interests = old('interests').select('id', 'name');
  return Promise.all([new_interests, old_interests]).then(([nr, or]) => {
    or.forEach(e => {
      e.name = e.name.replace(/^[\s]+|[^ |^\w]|\s+$/g, '');
      let x = nr.find(n => n.name === e.name);

      interests[e.id] = x && x.id ? x.id : 1;
    });
    return interests;
  });
};

const getFromName = (db, old, table, value = 'name') => {
  let o = {};
  return db(table).select('id', value).then(r => {
    r.forEach(e => (o[e[value]] = e.id));
    return o;
  });
};

const getFromUpperName = (db, old, table, value = 'name') => {
  let o = {};
  return db(table).select('id', value).then(r => {
    r.forEach(e => (o[e[value].toUpperCase()] = e.id));
    return o;
  });
};
//rematch project id
module.exports.moreStuff = (db, old, h) => {
  return Promise.all([
    getMatchingId(db, old, 'projects'),
    getFromUpperName(db, old, 'skills')
  ]).then(([projects, skills]) => {
    h.projects = projects;
    // console.log(h.projects);
    h.skills = skills;
  });
};

module.exports.stuff = (db, old, h) => {
  return Promise.all([
    getMatchingId(db, old, 'users'),
    getFromUpperName(db, old, 'location', 'city'),
    getFromUpperName(db, old, 'networks_list'),
    getInterests(db, old),
    getFromName(db, old, 'partnerships'),
    getFromName(db, old, 'rooms')
  ]).then(([users, location, networks, interests, partnerships, rooms]) => {
    h.users = users;
    h.location = location;
    h.networks = networks;
    h.interests = interests;
    h.partnerships = partnerships;
    h.rooms = rooms;
    h.transform = (r, t) => {
      let ret = [];
      r.forEach(e => {
        if (t.indexOf('users') !== -1) {
          e.user_id = h.users[e.user_id] || 0;
        }
        if (t.indexOf('viewed') !== -1) {
          e.viewed = h.users[e.viewed];
        }
        if (t.indexOf('invited_by') !== -1) {
          e.invited_by = h.users[e.invited_by];
        }
        if (t.indexOf('followed') !== -1) {
          e.followed = h.users[e.followed];
        }
        if (t.indexOf('location') !== -1) {
          if (!e.loc_id) e.loc_id = 1;
          else e.loc_id = h.location[e.loc_id.toUpperCase()] || 1;
        }
        if (t.indexOf('networks') !== -1) {
          e.network_id.replace('_', ' ');
          console.log('network_id', e.network_id);
          for (k in h.networks) {
            if (new RegExp(`.*${e.network_id}.*`, 'i').test(k)) {
              console.log('SUCCESS !!', k, e.network_id);
              e.network_id = h.networks[k];
              break;
            }
          }
          console.log('ID OF NETWORK', e.network_id);
          if (typeof e.network_id === 'string') {
            console.log('FAILED FAILED e.network_id', e.network_id);
            e.network_id = 21;
          }
          // e.network_id = h.networks[e.network_id] || 20;
        }
        if (t.indexOf('interests') !== -1) {
          e.interest_id = h.interests[e.interest_id] || 1;
        }
        if (t.indexOf('partnerships') !== -1) {
          e.partnership_id = h.partnerships[e.partnership_id];
        }
        if (t.indexOf('rooms') !== -1) {
          const nr = e.room_id.split('_');
          const n = `${nr[1]}_${nr[0]}`;
          e.room_id = h.rooms[e.room_id] ? h.rooms[e.room_id] : h.rooms[n];
        }
        if (t.indexOf('projects') !== -1) {
          e.project_id = h.projects[e.project_id];
        }
        if (t.indexOf('skills') !== -1) {
          if (!e.skill_id) e.skill_id = '';
          e.skill_id = h.skills[e.skill_id.toUpperCase()] || 0;
        }
        if (e.user_id !== 0 && e.skill_id !== 0) ret.push(e);
      });
      return ret;
    };
  });
};
