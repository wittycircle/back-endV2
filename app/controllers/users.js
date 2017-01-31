/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';
//move to profile all related things to profile (using only table.users_profiles)

const user = require('../models/users'),
    geo = require('../utils/geolocation'),
    bcrypt = require('bcrypt-nodejs'),
    _ = require('lodash'),
    home = 'http://localhost:3000';
// pf = require('../utils/profile_functions');

exports.getUserShare = (req, res) => {
    user.getUserShare(req.user_id).then(social_share => {
        if (!social_share[0].social_share)
            res.send({success: false});
        else
            res.send({success: true})
    }).catch(err => {

        console.error("Could not get social share");
        res.location(home);
        res.send({success: false})
    });
};

exports.updateUserShare = (req, res) => {
    user.updateUser({social_share: 1}, {id: req.user_id})
        .then(res.send({success: true}))
        .catch(err => {
            console.err("Error updating user social share")
        })
};

exports.getUsersValidateMail = (req, res) => {
    user.getUsersValidateMail(req.params.token)
        .then((email) => {
            if (email.length === 0) {
                res.status(404).send({message: 'Could not validate email'})
            } else {
                res.send(email[0])
            }
        }).catch(err => {
        console.error('Could not get mail from token')
    })
};

exports.ValidateAccount = (req, res) => {
    user.getToken(req.params.token)
        .then((token) => {
            if (token.length !== 0) {
                user.updateUser({valid: 1}, {email: req.body.email})
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
};

exports.checkFirstLog = (req, res) => {
    if (!req.user_id) {
        res.status(404).send('Cannot find first log')
    }
    else {
        user.getFirstLog(req.user_id)
            .then((value) => res.send(value[0]))
    }
};

exports.updateFirstLog = (req, res) => {
    if (!req.user_id) {
        res.status(404).send('Cannot update first log')
    }
    else {
        user.updateFirstLog(req.user_id)
            .then((value) => res.send({success: true}))
    }
};

//v1 : getUserIdByProfileId
exports.getUserFromProfile = (req, res) => {
    user.getUserFromProfile(req.params.profile_id)
        .then((id) => res.send({success: true, content: id[0]}))
        .catch(console.error("Could not get user from profile"))

};

// v1 : getProfilesByProfileId
exports.getProfile = (req, res) => {
    user.getProfile(req.params.profile_id)
        .then((id) => res.send({success: true, content: id[0]}))
        .catch(console.error("Could not get profiles"))
};

//v1: getProfileIdByUserId
exports.getProfileId = (req, res) => {
    user.getProfileId(req.user_id)
        .then((id) => res.send({success: true, content: id[0]}))
        .catch(console.error("Could not get profile"))
};

exports.getUsers = (req, res) => {
    user.getUsers()
        .then(users => {
            res.send(users)
        }).catch(err => {
        console.error(err)
    })
};

exports.getProfiles = (req, res) => {
    user.getProfiles()
        .then(profiles => {
            res.send(profiles)
        }).catch(err => {
        console.error(err)
    })
};

exports.getUser = (req, res) => { //Unused as of now
    user.getUser(req.params.id)
        .then(user => {
            res.send(user)
        }).catch(err => {
        console.error(err)
    })
};

exports.getCardProfile = (req, res) => {
    user.cardProfile()
        .then((r) => {
            res.send(r)
        }).catch(err => {
        console.error(err)
    })
};

exports.getCardProfileHome = (req, res) => {
    geo.getLocation(req.body, function (city, state, country) {
        console.log("INFO: ", city, state, country);
        user.cardProfileHome(city, state, country)
            .then((r) => res.send(r))
            .catch((err) => {
                console.error(err)
            })
    })
};

exports.getUserByEmail = (req, res) => {
    user.getUserByEmail(req.params.email)
        .then((r) => {
            if (r) {
                res.send(r)
            }
            else {
                res.send({err: "Unknown email"})
            }
        })
        .catch((e) => {
            console.error(e)
        })
};


exports.getUserbyUsername = (req, res) => {
    user.getUserByUsername(req.params.username)
        .then((r) => {
            if (r) {
                res.send(r)
            }
            else {
                res.send({err: "Unknown username"})
            }
        })
        .catch((e) => {
            console.error(e)
        })
};

exports.updateProfileView = (req, res) => {
    user.updateProfileView(req.params.username)
        .then((r) => {
            if (r) {
                res.send({success: true, toto: r.insertId, tata: "id: " + id})
            }
            else {
                res.send({success: false, msg: "Unknown username"})
            }
        })
        .catch((e) => {
            console.error(e)
        })
};

exports.searchUser = (req, res) => {
    user.searchUser(req.params.search)
        .then((r) => {
            if (r) {
                res.send(r)
            }
            else {
                res.send({msg: "Could not find any users matching " + req.param.search})
            }
        })
};

const checkUsername = (first, last, pswd) => {
    let username;
    let password = bcrypt.hashSync(pswd);
    let a_username = [];
    let firstName = first.replace(/\s+/g, '');
    let lastName = last.replace(/\s+/g, '');

    for (let i = firstName.length; i > 0; i--) {
        a_username.push(firstName.slice(0, i) + '.' + lastName);
    }
    for (let i = lastName.length - 1; i > 0; i--) {
        a_username.push(firstName + '.' + lastName.slice(0, i));
    }
    return user.checkUsername(a_username)
        .then((r) => {
            if (r.length === a_username.length) {
                username = firstName + '.' + lastName + Math.floor((Math.random() * 10000) + 1)
            } else {
                let nr = _.map(r, v => v.username);
                username = _.differenceWith(a_username, nr, _.isEqual)[0]
            }
            return ({firstName, lastName, username, password})
        })
};

exports.createUser = (req, res) => {
    user.getUserByEmail(req.body.email).then((exist) => {
        if (exist.length) {
            res.send({sucess: false, msg: 'Email is already taken', exist: exist});
        } else {
            checkUsername(req.body.first_name, req.body.last_name, req.body.password)
                .then(({firstName, lastName, username, password}) => {
                    user.createProfile(firstName, lastName)
                        .then((profileId) => {
                            user.createUser(profileId, req.body.email, username, password)
                                .then(user.updateProfile({username: username}, profileId))
                                .then(user.updateInvitation)
                                .then(res.send({success: true, result: "created"}))
                                .catch((e) => {
                                    console.error(e)
                                })
                        })
                }).catch((e) => {
                console.error(e)
            })
        }
        // mailing.sendWelcomeMail();
        // mailing.sendValidateAccountMail();
    })
};

exports.updateUser = (req, res) => { //validation will be extern
    const newInfo = {email: req.body.email, username: req.body.username},
        newName = {first_name: req.body.first_name, last_name: req.body.last_name};

//remove three lines below (was for testing with postman, will be in test chakram directly)
    req.user = {};
    req.user.username = "Toto";
    req.user.email = "Tata@tata.com";

    if ((req.user.username !== req.body.username) || (req.user.email !== req.body.email)) {
        Promise.all([user.getFromUser(['id', 'username', 'email'], {email: req.body.email}),
            user.getFromUser(['id', 'username', 'email'], {username: req.body.username})])
            .then(([[r1,], [r2,]]) => {//deconstruct array from promise than return an array of object. to get the first one [[r1, ]]
                if (r1 && r1.email === req.body.email && r1.email !== req.user.email) {
                    res.send({success: false, msg: 'Email already in use ' + r1.email});
                } else if (r2 && r2.username === req.body.username && r2.username != req.user.username) {
                    res.send({success: false, msg: 'Username already in use ' + r2.username});
                }
                else {
                    Promise.all([user.updateProfileFromUser(newName, req.params.id),
                        user.updateUser(newInfo, {id: req.params.id})])
                        .then((result) => {
                            req.user.email = req.body.email;
                            req.user.username = req.body.username;
                            res.send({result: result, success: true, data: req.user});
                        }).catch((e) => console.error(e))
                }
            })
    } else {
        user.updateProfileFromUser(newName, req.params.id)
            .then((result) => res.send({"ELSE": "ELSE", result: result, success: true, data: req.user}))
    }
};

exports.updateUserCredentials = (req, res) => {
    if (typeof req.body.password === 'undefined')
        res.send({err: "Undefined password"});

    const newSetting = {password: bcrypt.hashSync(req.body.password), email: req.body.email};
    user.getFromUser(['password'], {id: req.param.id})
        .then(pswd => {
            if (bcrypt.compareSync(req.body.curentPass, pswd)) {
                user.updateUser(newSetting, {id: req.params.id})
                    .then(res.send({success: true}))
            } else {
                res.send({success: false, msg: "Current password does not match"})
            }
        }).catch((e) => console.error(e))
};

exports.deleteUser = (req, res) => {
    user.deleteFromProfile({id: req.params.id})
        .then(res.send({success: true}))
        .catch((e) => console.error(e))
};

