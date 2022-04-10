// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const SendGrid = require('@sendgrid/mail');
if (!process.env?.SENDGRID_API_KEY) throw new Error('@lawlzer/email requires a SENDGRID_API_KEY environment variable.');
SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require('fs');

const allPresets = fs.readdirSync(`${process.cwd()}/etc/presets`).map((presetName) => {
	const preset = require(`${process.cwd()}/etc/presets/${presetName}`);
	return {
		name: presetName.replace('.js', ''),
		myFunc: preset,
	};
});

const sendEmail = async ({ to, subject, text, preset } = {}) => {
	if (!to) throw new Error('@lawlzer/email (sendEmail) function requires a to email address.');
	if (!subject) throw new Error('@lawlzer/email (sendEmail) function requires a subject.');
	if (!text) throw new Error('@lawlzer/email (sendEmail) function requires a text body.');

	if (preset) {
		presetHTML = allPresets.find((singlePreset) => singlePreset.name === preset.name)?.myFunc(preset);
		if (!presetHTML) throw new Error(`@lawlzer/email (sendEmail) function requires a preset that exists. "${preset.name}" does not exist.`);
	}

	const footerHTML = allPresets.find((singlePreset) => singlePreset.name === 'footer')?.myFunc();
	if (!footerHTML) throw new Error('@lawlzer/email (sendEmail) function requires a footer that exists.');

	try {
		const msg = {
			to: to,
			from: process.env.FROM_EMAIL,
			subject: subject,
			text: text,
			html: presetHTML + footerHTML,
		};
		const response = await SendGrid.send(msg);
		console.log('response: ', response);
	} catch (e) {
		throw new Error('@lawlzer/email sending email error: \n' + e);
	}
};
module.exports.sendEmail = sendEmail;

// opt-out

// https://achievevalue.tech
// https://i.ibb.co/272NT0y/Logo-Small-Square-removebg-preview.png
