import { Meteor } from 'meteor/meteor';
import { google } from 'googleapis';


export const getUrl = () => {
	const oAuth2Client = new google.auth.OAuth2(
		Meteor.settings.private.GOOGLE_CLIENT_ID,
		Meteor.settings.private.GOOGLE_CLIENT_SECRET,
		Meteor.settings.private.GOOGLE_REDIRECT_URL,
		'http://localhost:3000/oauth/google'
	);

	return oAuth2Client.generateAuthUrl({
		scope: [
			'https://www.googleapis.com/auth/documents',
			'https://www.googleapis.com/auth/drive',
		],
	});
};


export const getToken = (code) => {
	const oAuth2Client = new google.auth.OAuth2(
		Meteor.settings.private.GOOGLE_CLIENT_ID,
		Meteor.settings.private.GOOGLE_CLIENT_SECRET,
		Meteor.settings.private.GOOGLE_REDIRECT_URL,
	);

	return new Promise((reject, resolve) => {
		oAuth2Client.getToken(code, (token, error) => {
			if (error) {
				reject(error);
			}
			resolve(token);
		});
	});
};
