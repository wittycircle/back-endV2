/*
 [line number [approximate due to change]]
 -	ask_project: controllers/projects  [106]
 -	upvote_project: controllers/projects [217]
 invite_user: controllers/project [242],  -> UNDEFINED
 invite_team: UNDEFINED,
 new_message: UNDEFINED,
 -	new_project: controllers/projects [35],
 -	reply_project: controllers/discussion [56],
 -	reset_password: controllers/account [74],
 suggestion_profile: ,
 suggestion_project: ,
 uc_invitation: UNDEFINED,
 -	user_follow: controllers/profiles [71],
 S-	validate_account: controllers/accounts [45],
 validation-network: FOR LATER,
 verification_network: controllers/network [52] (Way unsure about this one),
 profile_views:,
S -	welcome : controllers/account [59]
 */

const filt = e => e !== 'templates'
&& e !== 'index.js'
&& e !== 'wittymail.js'
&& e !== 'example_kitchen.js';

const files = require('fs').readdirSync('../app/services/mailer')
    .filter(filt);


let mails = {}

if (process.env.NODE_ENV === "development") 
{
	files.forEach(e => {
		let n = e.split('.')[0] 
		mails[n]  = (args) => console.log(`no [ ${n} ] mail, dev environment`) 
	}); 
}
// ------------------ PROD ENVIRONMENT ------------------
else {
	files.forEach(e => {
		let n = e.split('.')[0] 
		mails[n]  = (args) => require(`./${n}`)(args) 
	});
 }

// ------------------ DEV ENVIRONMENT ------------------


// files.forEach(e => {
// 	let n = e.split('.')[0]
// 	mails[n]  = (args) => console.log(`no [ ${n} ] mail, dev environment`)
// });


module.exports = mails
