import { Meteor } from 'meteor/meteor';

import Meetings from '/imports/api/collections/Meetings';


Meteor.publish('meetings', function() {
	if (!this.userId) {
		return this.ready();
	}

	return Meetings.find({
		archivedAt: null
	}, {
		sort: {
			_createdAt: -1,
		}
	});
});
