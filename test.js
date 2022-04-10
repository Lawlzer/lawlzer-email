const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const email = require.main.require('./index.js');
email.config({
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	preset_path: path.join(__dirname, '/etc/email_presets'),
	from_email: 'administration@achievevalue.tech',
});

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
