import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MeetingsList from './MeetingsList';
import LoginForm from './LoginForm';

const logout = () => Meteor.logout();

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
}));

export const App = () => {
	const classes = useStyles();
	const isLoggedIn = useTracker(() => !!Meteor.userId());

	return (
		<Fragment>
			<CssBaseline />
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Meetings
					</Typography>
					{isLoggedIn && (
						<Button
							startIcon={<ExitToAppIcon />}
							color="inherhit"
							onClick={logout}>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<main className={classes.content}>
				{isLoggedIn ? (
					<MeetingsList />
				) : (
					<LoginForm />
				)}
			</main>
		</Fragment>
	);
};
