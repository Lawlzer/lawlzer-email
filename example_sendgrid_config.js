const config = {
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	from_email: 'kevindaspam@gmail.com',
	website_url: 'https://achievevalue.tech',
	footer: {
		image: {
			url: 'https://i.ibb.co/272NT0y/Logo-Small-Square-removebg-preview.png',
			width: '100',
			height: '100',
		},
		motto: 'Empowering the next gen web',
		links: [
			{ text: 'Website', url: 'https://www.achievevalue.tech' },
			{ text: 'Github', url: 'https://www.github.com/AchieveValue' },
			{ text: 'Twitter', url: 'https://www.twitter.com/AchieveValue' },
			{ text: 'Instagram', url: 'https://www.instagram.com/achieve_value' },
			{ text: 'Discord', url: 'https://www.discord.gg/nYHze5HWQP' },
		],
	},
};

module.exports = config;
