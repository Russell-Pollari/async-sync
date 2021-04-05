import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';


export const updateUser = new ValidatedMethod({
	name: 'users.update',

	validate: new SimpleSchema({
		firstName: String,
		lastName: String,
		email: String,
	}).validator(),

	run({ firstName, lastName, email }) {
		if (Meteor.isServer) {
			Meteor.users.update({ _id: this.userId }, {
				$set: {
					firstName,
					lastName,
					'emails.0.address': email,
				},
			});
		}
	},
});
