import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import baseSchema from './baseSchema';

const schema = new SimpleSchema({
	owner: {
		type: String,
		index: 1,
	},
	date: {
		type: Date,
		index: 1,
	},
	description: String,
	url: String,
	title: String,
});

const Meetings = new Mongo.Collection('meetings');

Meetings.attachSchema(baseSchema);
Meetings.attachSchema(schema);

export default Meetings;
