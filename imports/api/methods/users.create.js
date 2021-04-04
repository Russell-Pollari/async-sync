import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const createUser = new ValidatedMethod({
	name: 'users.create',

	validate: new SimpleSchema({
		firstName: String,
		lastName: String,
		email: String,
	}).validator(),

	run({ email, firstName, lastName }) {
		if (Meteor.isServer) {
			const userId = Accounts.createUser({ email, firstName, lastName });
			Accounts.sendEnrollmentEmail(userId);
		}
	}
});
