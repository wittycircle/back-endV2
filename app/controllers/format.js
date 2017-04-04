const _ = require('lodash');

exports.likes = (uid, date) => {
	const ret = [];
	for(let k = 0, length = uid.length; k < length; k++){
		ret.push({
			user_id: uid[k],
			creation_date: date[k]
		});
	}
	return ret;
};

//  			"rep_id": "50,52",
//       "rep_user_id": "1,596",
//       "rep_creation_date": "2016-07-06 01:14:10,2016-10-05 07:14:04",
//       "rep_message": "Can't wait for the next steps ;)€€¢€€Hi, so sorry for the delay! We've put more info on the story tab, which also includes additional \"wigglegram\"

const rep_likes = (match, id, date) => {
	const ret = []
	if (match){
		match.map((el, i) => {
			if (el[0] == id)
				ret.push({user_id: el[1], creation_date: date.split(',')[i]})
		})
	}
	return ret;
};

exports.replies = (id, uid, date, message, el) => {
	let replies = [];
	let x, match, o;
	if (el.prl_user_id){
		x = el.prl_user_id.split(',')
		match = x.map(el => el.split('-'))
	}
	for(let k = 0, length = id.length; k < length; k++) {
		replies.push({
			id: id[k],
			user_id: uid[k],
			creation_date: date[k],
			message: message[k],
			likes: rep_likes(match, id[k], el.prl_creation_date)
		});
	}
	return replies;
};

exports.discussion = (data) => {
	const ret = [];
	data.forEach((el) => {
 		ret.push({
 			id: el.id,
			user_id: el.user_id,
			title: el.title,
			message: el.message,
			creation_date: el.creation_date,
			likes: el.like_user_id ? exports.likes(el.like_user_id.split(','), el.like_creation_date.split(',')) : [],
 			replies: el.rep_id ? exports.replies(el.rep_id.split(','), el.rep_user_id.split(','), 
 												el.rep_creation_date.split(','), el.rep_message.split('€€¢€€'), el) : [],

 		});
	});
	return ret;
};
