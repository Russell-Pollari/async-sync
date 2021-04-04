import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '/imports/api/collections/Users';

import '/imports/api/methods/meetings.create';
import '/imports/api/methods/meetings.archive';
import '/imports/api/methods/users.create';
import '/imports/api/methods/users.remove';

import '/imports/api/publications/meetings';
import '/imports/api/publications/users';


Meteor.startup(() => {
	Accounts.urls.enrollAccount = (token) => {
		return Meteor.absoluteUrl(`/enroll-account/${token}`);
	};

	Accounts.onCreateUser((options, user) => {
		return {
			...user,
			...options,
		};
	});

	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			firstName: 'admin',
			lastName: 'user',
			email: 'admin@meetings.com',
			password: 'admin',
		});
	}
});
