const account = require('../models/account'),
    _ = require('lodash');	

// ------------------ Little helpers ------------------
const checkUsername = (data) => {
	let nd = {//new_data
		username: null,
		password: bcrypt.hashSync(data.password),
		first_name: data.first_name.replace(/\s+/g, ''),
		last_name: data.last_name.replace(/\s+/g, ''),
	}
    let a_username = [];
    for (let i = nd.first_name.length; i > 0; i--) {
        a_username.push(nd.first_name.slice(0, i) + '.' + nd.last_name);
    };
    for (let i = nd.last_name.length - 1; i > 0; i--) {
        a_username.push(nd.first_name + '.' + nd.last_name.slice(0, i));
    }
    return account.checkUsername(a_username)
    .then((r) => {
        if (r.length === a_username.length){
            username = nd.first_name + '.' + nd.last_name + Math.floor((Math.random() * 10000) + 1)
        } else {
            // let nr = _.map(r, v => v.username)
            let nr = r.map(v => v.username)
           username =  _.differenceWith(a_username, nr, _.isEqual)[0]
        }
        return (nd)
    })
};
// ------------------ Main methods ------------------
exports.activate = (req, res, next) => {
	account.activate(req.body.token, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.register = (req, res, next) => {
	const data = checkUsername(req.body.account)
	account.register(req.body.account)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad info [email or password]'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.resetPassword = (req, res, next) => {
	account.resetPassword(req.body.token, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.recoverPassword = (req, res, next) => {
	account.recoverPassword(req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format'])
			}
			else{
 //			***	SEND RECOVER EMAIL	***
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.updatePassword = (req, res, next) => {
	account.updatePassword(req.body.password, req.body.email)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format [password]'])
			}
			else{
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};
