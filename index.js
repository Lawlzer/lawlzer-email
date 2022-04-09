// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const SendGrid = require('@sendgrid/mail');

// will be set up in config()
let footer = {
	image: {},
};

const config = (configInfo) => {
	if (!configInfo.SENDGRID_API_KEY) throw new Error('@lawlzer/email requires a SENDGRID_API_KEY in the configInfo.');
	SendGrid.setApiKey(configInfo.SENDGRID_API_KEY);

	from_email = configInfo?.from_email;
	if (!from_email) throw new Error('@lawlzer/email requires a from_email in the configInfo.');

	footer.image.url = configInfo?.footer?.image?.url;
	if (!footer.image.url) throw new Error('@lawlzer/email requires a footer.image.url in the configInfo.');

	footer.image.width = configInfo?.footer.image?.width;
	if (!footer.image.width) throw new Error('@lawlzer/email requires a footer.image.width in the configInfo.');

	footer.image.height = configInfo?.footer.image?.height;
	if (!footer.image.height) throw new Error('@lawlzer/email requires a footer.image.height in the configInfo.');

	website_url = configInfo?.website_url;
	if (!website_url) throw new Error('@lawlzer/email requires a website_url in the configInfo.');

	const plainLinks = configInfo?.footer?.links;
	if (!plainLinks) throw new Error('@lawlzer/email requires a links array in the configInfo object.');
	footer.htmlLinks = plainLinks.map((link) => `<a href="${link.url}">${link.text}</a>`).join(' | ');

	motto = configInfo?.footer?.motto;
	if (!motto) throw new Error('@lawlzer/email requires a motto in the config file.');
};
module.exports.config = config;
// <a href="${website_url}" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank"">LinkedIn</a></p>

/*
<div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Create your username and password for your new Twilio SendGrid account.</span>
	<div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
	<table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
		<tbody>
			<tr>
			<!-- legacy code (shows thing at the top) 
				<td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span>
				<a href="${website_url}" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none" target="_blank"><img alt="SendGrid" height="30" src="${website_url}" style="max-width:100%;border-style:none;width:137px;height:30px" width="137" class="CToWUd"></a></span></td>
				-->
				</tr>
		</tbody>
	</table>
	</div>

	<div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
	<table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
		<tbody>
			<tr>
				<td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
				<table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
					<tbody>
						<tr>
							<td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
							<h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">Your Link to Set Up Two-Factor Authentication</h2>

							<p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Protect your account by requiring both your password and an authentication code when logging into Twilio SendGrid. Below is your secure link to start setting up Two-Factor Authentication for the account tied to this email address.</p>

							</td>
						</tr>
						<tr>
							<td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
							<table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
								<tbody>
									<tr>
										<td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
										<table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
											<tbody>
												<tr>
													<td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top">
													<a href="${website_url}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Set Up Two-Factor Authentication</a></td>
												</tr>
											</tbody>
										</table>
										</td>
									</tr>
								</tbody>
							</table>
							</td>
						</tr>
					</tbody>
				</table>
				</td>
			</tr>
		</tbody>
	</table>
	</div>

*/
const sendEmail = async ({ to, subject, text, html, prebuilt } = {}) => {
	if (!to) throw new Error('@lawlzer/email (sendEmail) function requires a to email address.');
	if (!subject) throw new Error('@lawlzer/email (sendEmail) function requires a subject.');
	if (!text) throw new Error('@lawlzer/email (sendEmail) function requires a text body.');

	let htmlContent = html || text; // if there is no custom HTML, just use the text given to us.

	const footerHTML = `
	<div style="box-sizing:border-box;clear:both;width:100%">
	<table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%">
		<tbody>
			<tr style="font-size:12px">
				<td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top"><span style="float:none;display:block;text-align:center">
				<a href="${website_url}" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px" target="_blank"><img alt="image alt?" height="16" src="${footer.image.url}" style="max-width:100%;border-style:none;font-size:12px;width:${footer.image.width}px;height:${footer.image.height}px" width="91" class="CToWUd"></a></span>

				<p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">${motto}</p>

				<p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">AchieveValue US LLC. 9870 Hamlet Ct South, Cottage Grove, Minnesota 55016</p>

				<p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">
				${footer.htmlLinks}
			</tr>
		</tbody>
	</table>
	</div>
	</div>`;

	try {
		const msg = {
			to: to, // Change to your recipient
			from: 'administration@achievevalue.tech', // Change to your verified sender
			subject: subject,
			text: text,
			html: htmlContent + footerHTML,
		};
		const response = await SendGrid.send(msg);
		console.log('response: ', response);
	} catch (e) {
		throw new Error('@lawlzer/email error: \n', e);
	}
	// .then(() => {
	// 	console.log('Email sent');
	// })
	// .catch((error) => {
	// 	console.error(error);
	// });
};
module.exports.sendEmail = sendEmail;
