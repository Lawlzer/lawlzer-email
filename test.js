require('dotenv').config();

const email = require.main.require('./adapters/email/index.js');
email.config(require.main.require('./example_sendgrid_config.js'));

(async () => {
	await email.sendEmail({
		to: 'kevindaspam@gmail.com',
		subject: 'Subject goes here',
		text: 'Text goes here',
	});
})();
