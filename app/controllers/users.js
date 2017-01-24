/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';
 //move to profile all related things to profile (using only table.users_profiles)

const user = require('../models/users'),
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
       user.getSkills(r[0].id)
       .then((rr) => {
            r[0].skills = rr
            res.send(r) 
    })
    })
        
    // user.getIdFromSkills()
    // .then((uid) => {
    //     let arr = uid.map(e => e.user_id)
    //     user.getIdFromProfiles(arr)
    //     .then((r) => {
    //         let arr2 = r.map(e => e.id)
    //         user.getInfoFromProfile(arr2)
    //         .then((info) => {
    //             pf.sortCardProfile(info, (array) => {
    //                 if (array[0]) {
    //                     res.send({success: true, data: array})
    //                 }
    //                 else{
    //                     res.send({success: false})
    //                 }
    //             })
    //         })
    //     })
    // })
}

// //===****==