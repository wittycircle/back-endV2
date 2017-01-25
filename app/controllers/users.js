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
    // user.savesave()
    .then((r) => {
        res.send(r)
    }).catch(err => {console.error(err)})
}


exports.getCardProfilePlus = (req, res) => {
    if (req.body[0]) {
        let arr = req.body.map(e => e.id)
        user.cardProfilePlus(arr)
            .then((r) => {
                res.send(r)
            }).catch(err => {console.error(err)})
    }
}

// exports.getCardProfilePlus = function(req, res) {

//     if (req.body[0]) {
//         var arr = req.body.map(function(el) { return el.id});
//         pool.query('SELECT id, first_name, last_name, description, location_city,
//          location_state, location_country, profile_picture, about,
//           cover_picture_cards FROM `profiles` 
//           WHERE id NOT IN (' + arr + ') && profile_picture is not null && fake = 0 ORDER BY rand() LIMIT 100', 
//             function (err, result) {
//                 if (err) throw (err);
//                 pf.sortCardProfile(result, function(array) {
//                     var newArray = req.body.concat(array); // ??
//                     return res.send({success: true, data: newArray});
//                 });
//             });
//     } else
//         return res.status(400).send("Error data!");
// };


//=-----------