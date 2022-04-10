require('dotenv').config();

const email = require.main.require('./index.js');

(async () => {
	// await email.sendEmail({
	// 	to: 'kevindaspam@gmail.com',
	// 	subject: 'Subject goes here',
	// 	text: 'Text goes here',
	// 	preset: {
	// 		name: 'email_verification',
	// 		USERNAME: 'Andrei Bunea',
	// 		VERIFICATION_CODE: '69696969',
	// 	},
	// });
	await email.sendEmail({
		to: 'kevindaspam@gmail.com',
		subject: 'Subject goes here',
		text: 'Text goes here',
		preset: {
			name: 'password_reset',
			USERNAME: 'Andrei Bunea',
			CODE: '69696969',
		},
	});
})();
