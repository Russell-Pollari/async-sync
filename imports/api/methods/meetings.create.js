import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import Meetings from '/imports/api/collections/Meetings';

export const createMeeting = new ValidatedMethod({
	name: 'meetings.create',

	validate: new SimpleSchema({
		url: String,
		title: String,
		description: String,
		date: Date,
	}).validator(),

	run({ url, title, date, description }) {
		console.log({ date });
		Meetings.insert({
			url,
			title,
			description,
			date,
			owner: Meteor.userId(),
		});
	}
});
