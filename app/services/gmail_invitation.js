const { db, TABLES } = require('../models/index'),
	mailer 			= require('./mailer'),
	check 			= require('../models/invitation');

const sendInvitationToGmailContacts = () => {
	db('gmail_auth_contacts').select('user_id').groupBy('user_id')
	.then(r => {
		function recursive(index) {
			if (index < r.length) {
				db('gmail_auth_contacts')
				.distinct('mail_to')
				.where('user_id', r[index].user_id)
				.then( f => {
					f = f.map(e => e.mail_to);
					check.verifyUsers(f).then( mailList => {
						mailer.invite_user({ uid: r[index].user_id, mailList, type: 'gmail_auth' })
						return recursive(index + 1);
					});
				})
			} 
		};
		recursive(0);
	})
}

sendInvitationToGmailContacts();
