// const {wm, TEMPLATES} = require('./wittymail');
// const helper = require('sendgrid').mail;
// const h = require('./app/models/helper');
// const {db, TABLES} = require('../../models/index');
// const _ = require('lodash');

// const send_mail = (data, token) => {
// 	let	mail = new helper.Mail();
// 	wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
// 	wm.content(mail)
// 	wm.reply(mail, "noreply@wittycircle.com");
// 	mail.setTemplateId(TEMPLATES.suggestion_profile)
	
// 	data.forEach((e, i) => {
// 		let pers = new helper.Personalization();
// 		let subject = 'Reset password'
// 		let sub = {
// 			"*|UNAME|*": ,
// 			"*|SKILLS|*": ,

// 			"*|PIMG1|*": ,
// 			"*|PNAME1|*": ,
// 			"*|PLOC1|*": ,
// 			"*|PURL1|*": ,
// 			// from 1 to 5
// 		};
// 		// x.forEach(b => {
// 		// 	sub.push({

// 		// 	})
// 		})
// 		console.log(sub)
// 		console.log("\n-------------------------------------------------\n")
// 		wm.subject(pers, subject);
// 		wm.to(pers, /*e.email*/ 'sequoya@wittycircle.com');
// 		wm.substitutions(pers, sub)
// 	    mail.addPersonalization(pers)
// 	}); //foreach
// 	wm.send(mail); 
// 	return null;
// };
	
// const suggestion_profile = (args) => {
// 	let user_profile = h.sub_profile.select('u.fake', 'p.city', 'p.country', 'p.state', 'u.email')


// 	let selection = [
// 		'pr.id', 'pr.title', 'pr.user_id as creator_id', 'pr.city', 'pr.country',
// 		'p.email', 'p.uid', 
// 		 // 's.skill_name', 'o.skill', 'ot.tag'
// 		// db.raw('GROUP_CONCAT(DISTINCT  p.email) as tabuid'), 
// 		// db.raw('GROUP_CONCAT (DISTINCT p.fullName) as fullName'),
// 		// db.raw('GROUP_CONCAT (DISTINCT s.skill_name ) as skills'),
// 		 // 's.skill_name','ot.tag', 'o.skill'
// 	];

//        let location =  ''
//        location += (`WHEN pr.city LIKE p.city THEN 1 `);
//        location += (`WHEN pr.state LIKE p.state THEN 2 `);
//        location += (`WHEN pr.country LIKE p.country THEN 3 `);

// 	let project = db(TABLES.PROJECTS + ' as pr')
// 					.distinct(selection)
// 					.join(TABLES.PROJECT_OPENINGS + ' as o', 'o.project_id', 'pr.id')
// 					.join(TABLES.OPENING_TAGS + ' as ot', 'ot.opening_id', 'o.id')
// 					.join(TABLES.USER_SKILLS + ' as s', function() {
// 						this.on('s.skill_name', 'ot.tag')
// 						this.orOn('s.skill_name', 'o.skill')
// 					})
// 					.join(user_profile, function() {
// 						this.on('p.uid', 's.user_id')
// 					})
// 					.where('project_visibility', 1)
// 					.where('p.fake', 0)
// 					// .where('p.about', 'join projects')
// 					.orderByRaw('CASE ' + location + ' else 100 END')
// 					// .limit(10)
// 					.orderBy('p.uid')
// 					// .groupBy('p.uid')

// console.log(project.toString())
// 	return project//.then((data) => send_mail(data, args.token))
// 		// .then((data) => console.log(data.map(e => [e.skill, e.skill_name, e.tag])))
// 		// .then((data) => console.log(data.map(e => [e.skill_name, e.uid])))
// 		.then(console.log)
// };//exports

// suggestion_profile(args)
// //module.exports = suggestion_profile
