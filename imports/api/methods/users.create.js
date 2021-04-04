import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const createUser = new ValidatedMethod({
	name: 'users.create',

	validate: new SimpleSchema({
		email: String,
	}).validator(),

	run({ email }) {
		if (Meteor.isServer) {
			const userId = Accounts.createUser({ email });
			Accounts.sendEnrollmentEmail(userId);
		}
	}
});
