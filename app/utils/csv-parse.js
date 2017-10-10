const fs = require('fs');
const csv = require("fast-csv");
const { db, TABLES } = require('../models/index');

let stream = fs.createReadStream('/Users/JayHo/Webs/WittyCircle/back-endV2/Bulk_Invitation_Csv/Founders_Space_out.csv');
let array = [];

const saveEmail = (emails) => {
	db('facebook_group_emails').insert(emails)
	.then(r => { console.log(r) });
};

const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let csvStream = csv()
    .on("data", function(data){
    	if (data[5] && reg.test(data[5]))
          array.push({ email: data[5] });
    })
    .on("end", function(){
    	saveEmail(array);
    });

stream.pipe(csvStream);

// fs.readFile('/Users/jayho/Desktop/Wittycircle/back-endV2/Bulk_Invitation_Csv/Founders_Space_out.csv', function (err, fileData) {
// 	console.log(err);
// 	console.log(fileData);
// });