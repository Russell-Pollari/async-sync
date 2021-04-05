import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { updateUser } from '/imports/api/methods/users.update';
import AccountForm from '/imports/ui/AccountForm';
import PasswordForm from '/imports/ui/PasswordForm';


const Account = () => {
	const loading = useTracker(() => {
		const sub = Meteor.subscribe('user');
		return !sub.ready();
	}, []);

	const user = Meteor.user();

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Fragment>
			<AccountForm user={user} updateUser={updateUser} />
			<PasswordForm />
		</Fragment>
	);
};

export default Account;
