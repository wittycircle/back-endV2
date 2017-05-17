const account = require('../models/account'),
	bcrypt = require('bcrypt-nodejs'),
mailer = require('../services/mailer'),
	crypto = require('crypto'),
    _ = require('lodash');	

// ------------------ Little helpers ------------------
const checkRegisterData = (data) => {
	let nd = {//new_data
		username: null,
		password: bcrypt.hashSync(data.password),
		first_name: data.first_name.replace(/\s+/g, ''),
		last_name: data.last_name.replace(/\s+/g, ''),
		email: data.email
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
            nd.username = nd.first_name + '.' + nd.last_name + Math.floor((Math.random() * 10000) + 1)
        } else {
            let nr = r.map(v => v.username)
           nd.username =  _.differenceWith(a_username, nr, _.isEqual)[0]
        }
        return (nd)
    })
};
// ------------------ Main methods ------------------

exports.register = (req, res, next) => {
	const token = crypto.randomBytes(20).toString('hex')
	checkRegisterData(req.body.account)
	.then(data => {
		account.register(data, token) 
		.then(r => {
			if (typeof r === 'string') {
                return next([r, 'Bad info [email or password]'])
            }
            else {
            	mailer.validate_account({token : token, email: req.body.account.email});
                // req.broadcastEvent('mailer_validate_account', {token: token, email: req.body.account.email });
                req.broadcastEvent('user_register', {id: r[0].id});
                res.send({success: true}).status(200)
			} 
		}).catch(err => next(err))
	});
};

exports.activate = (req, res, next) => {
	account.activate(req.params.token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad token'])
			}
			else{
				mailer.welcome({email: r[0].email})
				// req.broadcastEvent('mailer_welcome', {email : r[0].email})
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.resetPassword = (req, res, next) => {
	const password = bcrypt.hashSync(req.body.password);
	account.resetPassword(req.params.token, req.body.email, password)
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
	const token = crypto.randomBytes(20).toString('hex')
	account.recoverPassword(req.body.email, token)
		.then(r => {
			if (typeof r === 'string') {
				return next([r, 'Bad format'])
			}
			else{
                mailer.reset_password({token: token, email: req.body.email})
				res.send({success: true})
			}
		})
		.catch(err => next(err))
};

exports.updatePassword = (req, res, next) => {
	account.updatePassword(bcrypt.hashSync(req.body.password), req.user.id)
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

exports.updateInformations = (req, res, next) => {
    delete req.body.password;
    account.updateInformations(req.body, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad fields'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(['Username already taken']))
};
