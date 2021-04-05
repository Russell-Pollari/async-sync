import { Meteor } from 'meteor/meteor';
import { google } from 'googleapis';


export const createDocument = () => {
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

	return new Promise((resolve, reject) => {
		docs.documents.create({
			title: 'SM Meeting',
		}, (err, result)  => {
			if (err) {
				return reject(err);
			}

			const docId = result.data.documentId;

			drive.files.get({
				fileId: docId,
				fields: 'parents',
			}, (err, result) => {
				if (err) {
					return reject(err);
				}

				const previousParents = result.data.parents.join(',');

				drive.files.update({
					fileId: docId,
					removeParents: previousParents,
					addParents: Meteor.settings.private.GOOGLE_DRIVE_FOLDER_ID,
				}, (err) => {
					if (err) {
						return reject(err);
					}

					resolve(docId);
				});
			});
		});
	});
};
