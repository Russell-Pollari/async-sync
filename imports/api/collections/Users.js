import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import baseSchema from './baseSchema';

const schema = new SimpleSchema({
	firstName: {
		type: String,
		index: 1,
	},
	lastName: {
		type: String,
		index: 1,
	},

	// Built-in Meteor object for passwords and logins
	services: {
		type: Object,
		blackbox: true,
	},

	emails: Array,
	'emails.$': Object,
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	},
	'emails.$.verified': Boolean,
});


Meteor.users.attachSchema(baseSchema);
Meteor.users.attachSchema(schema);
