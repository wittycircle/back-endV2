/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

const user = require('../models/users');

exports.getUserShare = (req, res) => {
    req.checkParams('user_id', 'username must be an integer.').isInt();
    const errors = req.validationErrors(true);
    if (errors)
        return res.status(400).send(errors);
    else {
        user.getUserShare(req.user_id).then(social_share => {
            if (social_share.length === 0)
                res.send({success: false});
            else
                res.send(social_share)
        }).catch(err => {throw err});
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
            .catch(err => {throw "Error updating user social share"})
    }
}

exports.getUsersValidateMail = (req, res) => {
    user.getUsersValidateMail(req.params.token)
        .then((email) => {
            if (email.length === 0){
                res.status(404).send({message: 'Could not validate emaile'})
            } else {
                res.send(email)  
            }
        }).catch(err => {
            // console.log(new Date())  // useful? 
            throw "Error in users validate mail"
        })
}

exports.ValidateAccount = (req, res) => {
    pool.query('SELECT token from account_validation WHERE token = ?', req.params.token,
    function (err, result) {
        // if (err) {
        //     console.log(new Date());
        //     throw err;
        // }
         if (result.length !== 0) {
            pool.query('UPDATE users SET valid = 1 WHERE email = ?', req.body.email,
            function (err, response) {
                // if (err) {
                //     console.log(new Date());
                //     throw err;
                // } else {
                    pool.query('DELETE FROM account_validation WHERE token = ?', req.params.token,
                    function (err, data) {
                        if (err) {
                            console.log(new Date());
                            throw err;
                        } else {
                            return res.send({message: 'ok!'});
                        }
                    });
                // }
            });
        } else {
            return res.status(404).send({message: 'nop'});
        }
    });
}


exports.getUser = (req, res) => {
    user.getUser(req.user_id).then(user => {
        res.send(user)
    }).catch(err => {throw err });
};

exports.getUsers = (req, res) => {
    user.getUsers().then(users => {
        res.send(users)
    }).catch(err => {throw err });
};


exports.getUserByEmail = (req, res) => {
    user.getUserByEmail(req.user_email).then(user => {
        if (user.length === 0)
            res.send({success: false});
        else
            res.send(user);
    }).catch(err => {throw err });
};

