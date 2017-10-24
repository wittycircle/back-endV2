const fs = require('fs');
const csv = require("fast-csv");
const { db, TABLES } = require('../models/index');

let stream;
let argv3 = process.argv[3];

if (process.argv[2] !== 'prod')
	stream = fs.createReadStream('/Users/jayho/Desktop/Wittycircle/back-endV2/Bulk_Invitation_Csv/' + argv3 + '.csv');
else
	stream = fs.createReadStream('/home/ubuntu/WittycircleV2/Bulk_Invitation_Csv/' + argv3 + '.csv');

let array = [];

const saveEmail = (emails) => {
	db('facebook_group_emails').insert(emails)
	.then(r => { console.log('INSERT EMAILS DONE !') });
};

// const removeLow = (emails) => {
// 	db('facebook_group_emails')
// 	.whereIn('email', emails)
// 	.del()
//     .then(r => { console.log(r) });
// }

// const setCategory = (emails) => {
// 	db('facebook_group_emails')
// 	.whereIn('email', emails)
// 	.update({
// 		group_name: 'Global_Cultural_Entrepreneurship_FG'
// 	}).then(r => { console.log(r) })
// }

const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let csvStream = csv()
    .on("data", function(data){
    	if (data[6] && data[6] !== 'low') {
    		if (reg.test(data[5]))
        		array.push({ email: data[5], group_name: argv3 });
    	}
    })
    .on("end", function(){
    	// setCategory(array.map(e => e.email))
    	// removeLow(array.map(e => e.email ));
		saveEmail(array);
    });

stream.pipe(csvStream);

// fs.readFile('/Users/jayho/Desktop/Wittycircle/back-endV2/Bulk_Invitation_Csv/Founders_Space_out.csv', function (err, fileData) {
// 	console.log(err);
// 	console.log(fileData);
// });
