var nodemailer = require('nodemailer');

const sendEmail = (email, password, to, subject, text, attachments) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: email,
			pass: password,
		},
	});

	var mailOptions = {
		from: email,
		to: to,
		subject: subject,
		text: text,
		attachments: [attachments],
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};
module.exports.sendEmail = sendEmail;

sendEmail('selfMadeSpam@gmail.com', 'aF~<M8;;Zu{KNMuq{Q`?ms.%^F"Azp%DaFL%v2fh~yB9>J!w{J', 'kevindaspam@gmail.com', 'heyo subject', 'text goes here', { filename: 'hello world.txt', content: 'you are poopy dog' });
