import { Meteor } from 'meteor/meteor';
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
	emails: Array,
	'emails.$': Object,
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	},
	'emails.$.verified': Boolean,

	// Built-in Meteor object for passwords and logins
	services: {
		type: Object,
		blackbox: true,
	},
	googleToken: {
		type: Object,
		blackbox: true,
	},
}, {
	requiredByDefault: false,
});

Meteor.users.attachSchema(baseSchema);
Meteor.users.attachSchema(schema);
