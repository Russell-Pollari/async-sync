import { Meteor } from 'meteor/meteor';

import Meetings from '/imports/api/collections/Meetings';


Meteor.publish('meetings', function() {
	if (!this.userId) {
		return this.ready();
	}

	return Meetings.find({
		archivedAt: null,
	}, {
		fields: {
			owner: 1,
			_createdAt: 1,
			date: 1,
			title: 1,
			description: 1,
			meetingDocURL: 1,
		},
		sort: {
			_createdAt: -1,
		},
	});
});
