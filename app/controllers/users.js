/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';
 //move to profile all related things to profile (using only table.users_profiles)

const   user = require('../models/users'),
        geo = require('../utils/geolocation'),
        mailing = require('../utils/mailing'),
        bcrypt = require('bcrypt-nodejs'),
        home = 'http://localhost:3000';
    // pf = require('../utils/profile_functions');

exports.getUserShare = (req, res) => {
    req.checkParams('user_id', 'username must be an integer.').isInt();

    const errors = req.validationErrors(true);
    if (errors)
        return res.status(400).send(errors);
    else {
        user.getUserShare(req.user_id).then(social_share => {
            if (!social_share[0].social_share)
                res.send({success: false});
            else
                res.send({success: true})
        }).catch(err => {

            console.error ("Could not get social share")
            res.location(home)
            res.send({success:false})
        });
    }
};

exports.updateUserShare = (req, res) => {
    req.checkParams('user_id', 'username must be an integer.').isInt();
    const errors = req.validationErrors(true);
    if (errors)
        return res.status(400).send(errors);
    else {
        user.updateUserShare(req.user_id)
            .then(res.send({success:true}))
            .catch(err => {console.err ("Error updating user social share")})
    }
}

exports.getUsersValidateMail = (req, res) => {
    user.getUsersValidateMail(req.params.token)
        .then((email) => {
            if (email.length === 0){
                res.status(404).send({message: 'Could not validate email'})
            } else {
                res.send(email[0])
            }
        }).catch(err => { console.error ('Could not get mail from token') })
}

exports.ValidateAccount = (req, res) => {
    user.getToken(req.params.token)
        .then((token) => {
            if (token.length !== 0) {
                user.updateValidEmail(req.body.email)
                    .then((r) => {
                        if (!r) {
                            throw("email not found")
                    }
                    else {
                        user.deleteValidationToken(req.params.token)
                        .then(() => res.send({message: 'Validation successful'}))
                    }
                    }).catch((e) => res.status(404).send(e))
            }
        }).catch((e) => res.status(404).send(e))
}

exports.checkFirstLog = (req, res) => {
    if (!req.user_id) {
        res.status(404).send('Cannot find first log')
    }
    else {
   user.getFirstLog(req.user_id) 
    .then((value) => res.send(value[0]))
    }
}

exports.updateFirstLog = (req, res) => {
if (!req.user_id) {
        res.status(404).send('Cannot update first log')
    }
    else {
    user.updateFirstLog(req.user_id)
    .then((value) => res.send({success: true}))
    }
}

//v1 : getUserIdByProfileId
exports.getUserFromProfile = (req, res) => {
    user.getUserFromProfile(req.params.profile_id)
    .then((id) => res.send({success: true, content: id[0] })) //id or id[0], to test
    .catch(console.error("Could not get user from profile"))

}

// v1 : getProfilesByProfileId
exports.getProfile = (req, res) => {
    user.getProfile(req.params.profile_id)
        .then((id) => res.send({success:true, content: id[0]}))
        .catch(console.error("Could not get profiles"))
}

//v1: getProfileIdByUserId
exports.getProfileId = (req, res) => {
    user.getProfileId(req.user_id)
    .then((id) => res.send({success: true, content: id[0]}))
    .catch(console.error("Could not get profile"))
}

//not done yet //===****==

exports.getUsers = (req, res) => {
    user.getUsers()
    .then(users => {
        res.send(users)
    }).catch(err => {console.error (err)})
};

exports.getProfiles = (req, res) => { 
    user.getProfiles()
    .then(profiles => {
        res.send(profiles)
    }).catch(err => {console.error(err)})
}

exports.getUser = (req, res) => { //Unused as of now
   req.checkParams('id', 'id parameter must be an integer.').isInt().min(1);

    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).send(errors);
    } else {
        user.getUser(req.params.id)
            .then(user => {
                res.send(user)
            }).catch(err => {console.error(err)})
        }
}

exports.getCardProfile = (req, res) => {
    user.cardProfile()
    .then((r) => {
        res.send(r)
    }).catch(err => {console.error(err)})
}

exports.getCardProfileHome = (req, res) => {
    req.checkBody('ip', "error").isString();

    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).send(errors);
    }
    geo.getLocation(req.body, function (city, state, country) {
        console.log("INFO: ", city,  state, country)
        user.cardProfileHome(city, state, country)
        .then((r) => res.send(r))
        .catch((err) => {console.error(err)})
    })
}

exports.getUserByEmail = (req, res) => {
    req.checkParams('email', 'email parameter must be an integer.').isString().max(128).min(1);

    const errors = req.validationErrors(true);
    if (errors){
        return res.status(400).send(errors);
    }
    user.getUserByEmail(req.params.email)
        .then((r) => {
           if (r) { res.send(r) }
           else { res.send({err: "Unknown email"}) }
        })
        .catch((e) => {console.error(e)})
}


exports.getUserbyUsername = (req, res) => {
    req.checkParams('username', 'username must be a string.').isString().max(128).min(1);

    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).send(errors);
    }
    user.getUserByUsername(req.params.username)
    .then((r) => {
        if (r) { res.send(r) } 
        else { res.send({err: "Unknown username"}) }
    })
    .catch((e) => {console.error(e)})
}

exports.updateProfileView = (req, res) => {
    req.checkParams('username', 'username must be a string').isString().min(1).max(128);

    const errors = req.validationErrors(true);
    if (errors) return res.status(400).send(errors);
        user.updateProfileView(req.params.username)
        .then((r) => {
            if (r) { res.send({success: true, toto: r.insertId, tata: "id: " + id}) }
            else { res.send({success: false, msg: "Unknown username"}) }
        })
        .catch((e) => {console.error(e)})

}

exports.searchUser = (req, res) => {
    req.checkParams('search', 'Search must be a string between 1 and 128 characters.').isString().max(128).min(1);
    req.sanitize('search').Clean();

    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).send(errors);
    }
    user.searchUser(req.params.search)
    .then((r) => {
        if (r) { res.send(r) }
        else { res.send({msg: "Could not find any users matching " + req.param.search}) }
    })
}

const getUsername = (first, last) => new Promise( (_res, _r) => { // all this might be replace with simple
                                                                    //username = firstName + '.' + lastName
    let username;
    let a_username = [];
    let firstName = first.replace(/\s+/g, '');
    let lastName = last.replace(/\s+/g, '');
    for (let i = firstName.length; i > 0; i--) {
        a_username.push(firstName.slice(0, i) + '.' + lastName);
    };
    for (let i = lastName.length - 1; i > 0; i--) {
        a_username.push(firstName + '.' + lastName.slice(0, i));
    }
    let p_arr = [];  
    for (let i = 0; i < a_username.length; i++){
        p_arr.push(user.checkUsername(a_username[i]).then((r) => 
            r.length ? firstName + '.' + lastName + Math.floor((Math.random() * 10000) + 1) : a_username[i]))
        }
    Promise.all(p_arr).then((e) => { 
        _res ({firstName, lastName,  username: e[0]}) })
    
})

let passwordThing = (password) => { // do salting and stuff?
   return bcrypt.hashSync(password)
}

exports.createUser = (req, res) => {
    // {
    // // // const mandrill_client = new mandrill.Mandrill('XMOg7zwJZIT5Ty-_vrtqgA');
    // // /* Validate */
    // // // req.body.email = "raphael@wefittycircle.com"
    // // // req.body.password = "tototatatutu"
    // // // req.body.first_name = "tatwega"
    // // // req.body.last_name = "tototutu"

    // // // req.checkBody('email', 'E-Mail is already in used.').isUnique('email');
    // // // req.checkBody('email', 'E-Mail is not valid.').isString().isEmail().min(2).max(64);
    // // // req.checkBody('password', 'Password must be between 5 and 32 characters.').isString().min(5).max(32);
    // // // req.checkBody('first_name', 'First Name must be between 1 and 64 characters.').isString().min(1).max(64);
    // // // req.checkBody('last_name', 'Last Name must be between 1 and 64 characters.').isString().min(1).max(64);

    // // // /* Sanitize */
    // // // req.sanitize('email').Clean();
    // // // req.sanitize('password').trim();
    // // // req.sanitize('first_name').Clean(true);
    // // // req.sanitize('last_name').Clean(true);
        
    // }

    const errors = req.validationErrors(true);
    if (errors) { return res.status(400).send(errors) };
    user.getUserByEmail(req.body.email).then((exist) => {
    if (exist.length) {
           res.send({sucess: false, msg: 'Email is already taken', exist: exist});
   } else {
        getUsername(req.body.first_name, req.body.last_name)
            .then(({firstName, lastName, username}) => {
               user.createProfile(firstName, lastName).then((profileId) =>  {
                let password = passwordThing(req.body.password)
                user.createUser(profileId, req.body.email, username, password)
                .then(user.updateProfile({username:username}, profileId).catch((e) => console.error("NOPE NOPE ", e))
                .then(user.updateInvitation).catch((e) => console.error("NOPE NOPE ", e))
                .then(res.send({success: true, result: "created"})).catch((e) => console.error("NOPE NOPE ", e))
                ).catch((e) => console.error("NOPE NOPE ", e))
            }).catch((e) => console.error("NOPE NOPE ", e))
        }).catch((e) => console.error("NOPE NOPE ", e))
    }
     }).catch((e) => console.error("NOPE NOPE ", e))
        // mailing.sendWelcomeMail();
        // mailing.sendValidateAccountMail();
}

exports.updateUser = (req, res) => { //validation will be extern
    // {
    // //  req.checkParams('id', 'id parameter must be an integer.').isInt().min(1);
    // // //req.checkParams('id', 'id parameter must be current logged user.').isLoggedUser(req);
    // // req.checkBody('email', 'E-Mail is not valid.').isString().isEmail().min(2).max(64);
    // // req.checkBody('username', 'Username is not valid.').isString().min(2).max(64);
    // // req.checkBody('first_name', 'First Name must be between 1 and 64 characters.').isString().min(1).max(64);
    // // req.checkBody('last_name', 'Last Name must be between 1 and 64 characters.').isString().min(1).max(64);
    // // req.checkBody('profession', 'Profession must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('description', 'Profession must be between 1 and 512 characters.').optional().isString().min(1).max(512);
    // // req.checkBody('location_city', 'City must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('location_country', 'Country must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('website_url', 'Website URL must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('facebook_url', 'Facebook URL must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('twitter_url', 'Twitter URL must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('google_url', 'Google URL must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('linkedin_url', 'LinkedIn URL must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('about', 'About Text is limited to 10000 characters.').optional().isString().min(1).max(10000);
    // // req.checkBody('genre', 'Genre must be between 1 and 64 characters.').optional().isString().min(1).max(64);
    // // req.checkBody('birthdate', 'Birthdate must be between 1 and 64characters.').optional().isString().min(1).max(64);

    // // req.sanitize('email').Clean(true);
    // // req.sanitize('username').Clean(true);
    // // //req.sanitize('first_name').Clean(true);
    // // //req.sanitize('last_name').Clean(true);
    // // req.sanitize('profession').Clean(true);
    // // req.sanitize('description').Clean(true);
    // // req.sanitize('location_city').Clean(true);
    // // req.sanitize('location_country').Clean(true);
    // // req.sanitize('website_url').Clean();
    // // req.sanitize('facebook_url').Clean();
    // // req.sanitize('twitter_url').Clean();
    // // req.sanitize('google_url').Clean();
    // // req.sanitize('linkedin_url').Clean();
    // // req.sanitize('about').Clean(true);
    // // req.sanitize('genre').Clean(true);
    // // req.sanitize('birthdate').Clean();
    //}

    var errors      = req.validationErrors(true);
    var newInfo     =  {
    email   : req.body.email,
    username: req.body.username
    };
    var newName     = {
    first_name  : req.body.first_name,
    last_name   : req.body.last_name
    };

    if (errors) return res.status(400).send(errors);
    if ((req.user.username !== req.body.username) || (req.user.email !== req.body.email)) {


    } else {
        user.updateProfile(newName, req.param.id)
        .then((result) => res.send({result: result, success: true, data: req.user}))
    }

}