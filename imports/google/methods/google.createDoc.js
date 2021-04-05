import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';


export const createDoc = new ValidatedMethod({
	name: 'google.createDoc',

	validate: null,

	async run() {
		if (Meteor.isServer) {
			const { createDocument } = await import('/imports/google/server/documents');
			try {
				return await createDocument();
			} catch {
				throw new Meteor.Error('authenication-error', 'Error authenicating google');
			}
		}
	},
});
