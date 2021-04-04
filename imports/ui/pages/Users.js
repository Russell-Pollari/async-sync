import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import InviteUserForm from '/imports/ui/InviteUserForm';
import UserTable from '/imports/ui/UserTable';

import { createUser } from '/imports/api/methods/users.create';
import { removeUser } from '/imports/api/methods/users.remove';


const Users = () => {
	const [showInviteForm, setShowInviteForm] = useState(false);

	const loading = useTracker(() => {
		const sub = Meteor.subscribe('users');
		return !sub.ready();
	}, []);

	const users = useTracker(() => {
		return Meteor.users.find().fetch();
	}, []);

	const handleRemoveUser = (userId) => () => {
		removeUser.call({ userId }, (err) => {
			if (err) {
				alert(err);
			}
		});
	};

	return (
		<div>
			{showInviteForm ?  (
				<InviteUserForm
					createUser={createUser}
					close={() => setShowInviteForm(false)}
				/>
			) : (
				<div style={{ textAlign: 'right' }}>
					<Button
						color="primary"
						startIcon={<AddIcon />}
						variant="contained"
						onClick={() => setShowInviteForm(true)}>
						Invite user
					</Button>
				</div>
			)}
			<UserTable
				loading={loading}
				users={users}
				handleRemoveUser={handleRemoveUser}
			/>
		</div>
	);
};

export default Users;
