const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const sendMail = r => sg.API(r, (err, res) => console.log(res.statusCode));

const mails = {
	welcome: (args) sendMail(require('./welcome')(args)); // To email
};

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});

// if env.test == true {
module.exports = mails;
	
// }else {
// 	module.exports = {}
// }