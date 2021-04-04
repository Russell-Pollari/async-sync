import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function() {
	if (!this.userId) {
		return this.ready();
	}

	return Meteor.users.find({ }, {
		fields: {
			emails: 1,
		},
		sort: {
			_createdAt: -1,
		}
	});
});
