import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const removeUser = new ValidatedMethod({
	name: 'users.remove',

	validate: new SimpleSchema({
		userId: String,
	}).validator(),

	run({ userId }) {
		if (Meteor.isServer) {
			Meteor.users.remove({ _id: userId });
		}
	}
});
