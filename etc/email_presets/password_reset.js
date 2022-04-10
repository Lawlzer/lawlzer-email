module.exports = (preset) => {
	delete preset.name; // name of the preset

	let output = html;
	Object.keys(preset).map((key) => {
		const replaceWith = preset[key];
		if (!output.includes(`((${key}))`)) throw new Error(`${key} is not in the template`);
		output = output.replace(`((${key.trim()}))`, replaceWith);
	});
	return output;
};
const html = `
<div style="font-family: 'Open Sans', sans-serif; width: 100%;">
    <div id="m_5802680979961110428wrapper" style="width: 600px; height: 400px; margin: auto; margin-bottom: 40px; padding-bottom: 40px;">
        <div id="m_5802680979961110428content" style="background-color: white; color: black; font-size: 18px; padding: 20px 75px;">
            <h2 style="color: black;">Hey ((USERNAME))</h2>
            <p style="color: black;">Click the verification button below to reset your password.</p>
            <a
                style="text-decoration: none;"
                href="https://achievevalue.tech/reset_password?code=((CODE))"
                target="_blank"
            >
                <div style="background-color: #5d8b73; color: white; margin: auto; padding: 10px; text-align: center; width: 200px;">
                    <h3 style="margin: 0;">VERIFY EMAIL</span></h3>
                </div>
            </a>
            <p style="color: black;">
                If you have any questions or concerns, please contact <a style="color: #5d8b73; font-weight: bold; text-decoration: none;" href="https://achievevalue.tech" target="_blank">https://achievevalue.tech</a>.
            </p>
    </div>
</div>`;
