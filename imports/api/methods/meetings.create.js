import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import Meetings from '/imports/api/collections/Meetings';

export const createMeeting = new ValidatedMethod({
	name: 'meetings.create',

	validate: new SimpleSchema({
		url: String,
		title: String,
	}).validator(),

	run({ url, title }) {
		Meetings.insert({
			url,
			title,
		});
	}
});
