import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';

import Button from '@material-ui/core/Button';

import { createUser } from '/imports/api/methods/users.create';


const Account = () => {
	const loading = useTracker(() => {
		const sub = Meteor.subscribe('users');
		return !sub.ready();
	}, []);

	const users = useTracker(() => {
		return Meteor.users.find().fetch();
	}, []);

	const handleInviteUser = () => {
		createUser.call({
			email: 'test2@email.com',
		}, (err) => {
			if (err) {
				alert(err);
			}
		});
	};


	return (
		<div>
			<h5>Users</h5>
			{users.map((user) => (
				<div key={user._id}>
					{user.emails[0].address}
				</div>
			))}
			<Button
				onClick={handleInviteUser}>
				Invite user
			</Button>
		</div>
	);
};

export default Account;
