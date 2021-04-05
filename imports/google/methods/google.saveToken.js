import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';


export const saveToken = new ValidatedMethod({
	name: 'google.saveToken',

	validate: new SimpleSchema({
		code: String,
	}).validator(),

	async run({ code }) {
		if (Meteor.isServer) {
			const { getToken } = await import('/imports/google/server/auth');
			let token;
			try {
				token = await getToken(code).catch(err => console.error(err));
			} catch {
				throw new Meteor.Error('authenication-error', 'Error authenicating google');
			}
			Meteor.users.update({ _id: this.userId }, {
				$set: {
					googleToken: token,
				},
			});
		}
	},
});
