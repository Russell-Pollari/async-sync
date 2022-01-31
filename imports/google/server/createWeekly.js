import { Meteor } from 'meteor/meteor';
import { google } from 'googleapis';

const templateId = Meteor.settings.private.WEEKLY_TEMPLATE_ID;
const folderId = Meteor.settings.private.WEEKLY_FOLDER_ID;

export const createWeekly = (dateString, todos = {}) => {
	const oAuth2Client = new google.auth.OAuth2(
		Meteor.settings.private.GOOGLE_CLIENT_ID,
		Meteor.settings.private.GOOGLE_CLIENT_SECRET,
		Meteor.settings.private.GOOGLE_REDIRECT_URL,
	);

	const user = Meteor.users.findOne({ _id: Meteor.userId() }, {
		fields: {
			googleToken: 1,
		},
	});

	oAuth2Client.setCredentials(user.googleToken);

	const docs = google.docs({
		version: 'v1',
		auth: oAuth2Client,
	});

	const drive = google.drive({
		version: 'v3',
		auth: oAuth2Client,
	});

	const requests = [
		{
			replaceAllText: {
				containsText: {
					text: '{{meeting-date}}',
					matchCase: true,
				},
				replaceText: dateString,
			},
		},
		{
			replaceAllText: {
				containsText: {
					text: '{{russ-todos}}',
					matchCase: true,
				},
				replaceText: todos.russ,
			},
		},
		{
			replaceAllText: {
				containsText: {
					text: '{{ale-todos}}',
					matchCase: true,
				},
				replaceText: todos.ale,
			},
		},
		{
			replaceAllText: {
				containsText: {
					text: '{{rose-todos}}',
					matchCase: true,
				},
				replaceText: todos.rose,
			},
		},
	];

	return new Promise((resolve, reject) => {
		drive.files.copy({
			fileId: templateId,
			requestBody: {
				name: `${dateString}`,
				parents: [folderId],
			},
		}, (err, result) => {
			if (err) {
				return reject(err);
			}
			const documentId = result.data.id;
			docs.documents.batchUpdate({
				documentId,
				resource: { requests },
			}, (err, result) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				resolve(result.data.documentId);
			});
		});
	});
};
