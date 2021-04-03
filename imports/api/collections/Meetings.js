import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import baseSchema from './baseSchema';

const schema = new SimpleSchema({
	url: String,
	title: String,
});

const Meetings = new Mongo.Collection('meetings');

Meetings.attachSchema(baseSchema);
Meetings.attachSchema(schema);

export default Meetings;
