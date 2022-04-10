// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const SendGrid = require('@sendgrid/mail');

let presetPath;
let fromEmail;
const config = ({ SENDGRID_API_KEY, preset_path, from_email } = {}) => {
	if (!SENDGRID_API_KEY) throw new Error('@lawlzer/email.config requires a SENDGRID_API_KEY.');
	SendGrid.setApiKey(SENDGRID_API_KEY);

	presetPath = preset_path;
	fromEmail = from_email;
};
module.exports.config = config;

const fs = require('fs');
const fsPromises = require('fs').promises;

const getPresets = async () => {
	return (await fsPromises.readdir(presetPath)).map((presetName) => {
		const preset = require(`${presetPath}/${presetName}`);
		return {
			name: presetName.replace('.js', ''),
			myFunc: preset,
		};
	});
};

const sendEmail = async ({ to, subject, text, preset } = {}) => {
	if (!to) throw new Error('@lawlzer/email (sendEmail) function requires a to email address.');
	if (!subject) throw new Error('@lawlzer/email (sendEmail) function requires a subject.');
	if (!text) throw new Error('@lawlzer/email (sendEmail) function requires a text body.');

	const allPresets = await getPresets();

	if (preset) {
		presetHTML = allPresets.find((singlePreset) => singlePreset.name === preset.name)?.myFunc(preset);
		if (!presetHTML) throw new Error(`@lawlzer/email (sendEmail) function requires a preset that exists. "${preset.name}" does not exist.`);
	}

	const footerHTML = allPresets.find((singlePreset) => singlePreset.name === 'footer')?.myFunc();
	if (!footerHTML) throw new Error('@lawlzer/email (sendEmail) function requires a footer that exists.');

	try {
		const msg = {
			to: to,
			from: fromEmail,
			subject: subject,
			text: text,
			html: presetHTML + footerHTML,
		};
		const response = await SendGrid.send(msg);
		console.log('@lawlzer/email email sent response: ', response);
	} catch (e) {
		throw new Error('@lawlzer/email sending email error: \n' + e);
	}
};
module.exports.sendEmail = sendEmail;

// opt-out

// https://achievevalue.tech
// https://i.ibb.co/272NT0y/Logo-Small-Square-removebg-preview.png
