const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper');



exports.saveGoogleContacts = (uid, mails) => {

	let data = []

	mails.forEach(e => {
		data.push({ user_id: uid, email: e.email, name: e.name })
	});

	const getEmails = db(TABLES.GAC)
		.distinct('email')
		.select('name')
		.where('user_id', uid)
		.orderBy('name', 'desc')

	const saveEmails = db(TABLES.GAC)
		.insert(data)

	return saveEmails.then((e) => {
		return getEmails.then(r => {
			r.forEach((e, i) => {
				e[i] 				= i
				e['select'] 		= true
				e['searchField'] 	= e.name + ' ' + e.email
			});
			console.log(r.length);
			return r;
		});
	})
};