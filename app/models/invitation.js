const { db, TABLES } = require('./index'),
	_ = require('lodash'),
	h = require('./helper');

exports.getInvitation = id => {
	return h.spe_profile({ invite_link: id });
};

// DOUBLE CHECK 
const verifyInvite = (exports.verifyInvite = mails => {
	if (mails && !mails[0])
		return []
	return db(TABLES.INVITATION)
		.distinct('mail_to')
		.whereIn('mail_to', mails)
		.andWhereRaw('creation_date > NOW() - INTERVAL 2 WEEK')
		.then(badMails => {
			badMails = badMails.map(e => e.mail_to);
			return _.difference(mails, badMails);
		});
});

const verifyUsers = (exports.verifyUsers = mails => {
	return db(TABLES.USERS)
		.select('email')
		.whereIn('email', mails)
		.then(badMails => {
			badMails = badMails.map(e => e.email);
			return verifyInvite(_.difference(mails, badMails));
		})
});
// END DOUBLE CHECK

exports.addInvitation = (uid, mails) => {
	return h.exist(TABLES.USERS, uid).then(r => {
		if (!r.length) throw 'Unknown user';
		return verifyUsers(mails).then(verifiedEmails => {
			if (!verifiedEmails.length) return 'All emails already invited';
			return verifiedEmails;
		});
	});
};

exports.fromUser = (id, mails) => {
	return db(TABLES.USERS).select('id').where('invite_link', id).then(r => {
		if (!r.length) throw 'Unknown invite';
		return verifyInvite([mails]).then(verifiedEmails => {
			if (!verifiedEmails.length) throw 'Already invited';
			return db(TABLES.INVITATION).insert({
				user_id: r[0].user_id,
				status: 'registed',
				mail_to: verifiedEmails[0]
			});
		});
	});
};



exports.addGoogleContacts = (uid, mails) => {
	let data = []
	mails.forEach(mail => {
		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (reg.test(mail)) {
			data.push({ user_id: uid, mail_to: mail});
		}
	});
	if (data.length) {
		db(TABLES.GMAILCONTACTS)
			.insert(data)
			.then(r => console.log(r));
	}
}

exports.inviteFromGmailAuthContacts = (uid) => {
	return h.exist(TABLES.USERS, uid).then(r => {
		if (!r.length) throw 'Unknown user';
		return db(TABLES.GMAILCONTACTS)
			.select('mail_to')
			.where('user_id', uid)
			.then(r => {
				return verifyUsers(r.map(e => e.mail_to));
			})
	});
}
