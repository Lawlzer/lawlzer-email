import fs from 'fs';
import path from 'path';

import SendGrid from '@sendgrid/mail';

// https://github.com/sendgrid/sendgrid-nodejs

const fsPromises = fs.promises;

let fromEmail: string;
let presetDirectory: string;
let extraLogs: boolean = false;

export type EmailConfig = {
    sendgridAPIKey: string,
    fromEmail: string;
    presetDirectory: string;
    extraLogs: boolean; // if true, we will log who we are sending emails to
};

export type PresetTemplate = {
    presetName: string;
    replaceThese: { [key: string]: string }[];
};


export async function config(config: EmailConfig): Promise<void> {
	if (!config.sendgridAPIKey) throw new Error('@lawlzer/email - config - sendgridAPIKey is required');
	if (typeof config.sendgridAPIKey !== 'string') throw new Error('@lawlzer/email - config - sendgridAPIKey must be a string');

	if (!config.fromEmail) throw new Error('@lawlzer/email - config - fromEmail is required');
	if (typeof config.fromEmail !== 'string') throw new Error('@lawlzer/email - config - fromEmail must be a string');

	if (!config.presetDirectory) throw new Error('@lawlzer/email - config - presetDirectory is required');
	if (typeof config.presetDirectory !== 'string') throw new Error('@lawlzer/email - config - presetDirectory must be a string');

	if (typeof config.extraLogs === 'boolean') extraLogs = config.extraLogs;

	SendGrid.setApiKey(config.sendgridAPIKey);
	fromEmail = config.fromEmail;
	presetDirectory = config.presetDirectory;
};


async function getPreset(presetName: string): Promise<string> {
	if (!presetDirectory) throw new Error('@lawlzer/email - getPreset - presetDirectory is not set. Please call "config()" first.');

	const presetFilePath = path.resolve(presetDirectory, `${presetName}.html`);
	try {
		await fsPromises.access(presetFilePath); // throws if file does not exist, so we just catch it and return our own error 
	} catch (e) { throw new Error(`@lawlzer/email - getPreset - preset file "${presetFilePath}" does not exist.`); }

	const preset = await fsPromises.readFile(presetFilePath);
	return String(preset);
};


export async function sendEmail({ to, subject, presets }: { to: string, subject: string, presets: PresetTemplate[] }): Promise<void> {
	let html = '';

	for await (const preset of presets) {
		const { presetName, replaceThese } = preset;
		let presetHTML = await getPreset(presetName);

		for (const replaceThis of replaceThese) {
			for (const key in replaceThis) {
				const value = replaceThis[key];
				presetHTML = presetHTML.replaceAll(key, value);
			}
		};

		html += presetHTML;
	};

	const msg = {
		to: to,
		from: fromEmail,
		subject: subject,
		html: html,
	};

	try {
		await SendGrid.send(msg);
		if (extraLogs) console.log('@lawlzer/email - sendEmail - Email automatically sent to:', to);
	} catch (e) {
		throw new Error('@lawlzer/email - sendEmail - Sending email error: \n' + e);
	};
};


