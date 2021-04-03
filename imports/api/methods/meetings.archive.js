import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import Meetings from '/imports/api/collections/Meetings';

export const archiveMeeting = new ValidatedMethod({
	name: 'meetings.archive',

	validate: new SimpleSchema({
		meetingId: String,
	}).validator(),

	run({ meetingId }) {
		Meetings.update({ _id: meetingId }, {
			$set: {
				archivedAt: new Date(),
			}
		});
	}
});
