import { Meteor } from 'meteor/meteor';

import '/imports/api/methods/meetings.create';
import '/imports/api/methods/meetings.archive';
import '/imports/api/methods/users.create';
import '/imports/api/publications/meetings';
import '/imports/api/publications/users';



Meteor.startup(() => {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin@meetings.com',
			password: 'admin',
		});
	};
});
