import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState } from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './Menu';
import Meetings from './pages/Meetings';
import Users from './pages/Users';
import LoginForm from './pages/LoginForm';
import Account from './pages/Account';
import EnrollAccount from './pages/EnrollAccount';
import CreateWeekly from './pages/CreateWeekly';

import GoogleOAuth from '/imports/google/ui/pages/GoogleOAuth';


const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1,
	},
	content: {
		padding: theme.spacing(2),
	},
}));


export const App = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const classes = useStyles();
	const isLoggedIn = useTracker(() => !!Meteor.userId());

	const toggleDrawer = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	return (
		<BrowserRouter>
			<CssBaseline />
			<AppBar position="sticky">
				<Toolbar>
					{isLoggedIn && (
						<IconButton
							color="inherit"
							onClick={toggleDrawer}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6" className={classes.title}>
						SM Weekly Meetings
					</Typography>
				</Toolbar>
			</AppBar>
			<Menu open={drawerIsOpen} toggle={toggleDrawer} />
			<main className={classes.content}>
				<Container>
					{!isLoggedIn ? (
						<Switch>
							<Route path="/enroll-account/:code">
								<EnrollAccount />
							</Route>
							<Route>
								<LoginForm />
							</Route>
						</Switch>
					) : (
						<Switch>
							<Route path="/users">
								<Users />
							</Route>
							<Route path="/account">
								<Account />
							</Route>
							<Route path="/oauth/google">
								<GoogleOAuth />
							</Route>
							<Route path="/create-weekly">
								<CreateWeekly />
							</Route>
							<Route>
								<Meetings />
							</Route>
						</Switch>
					)}
				</Container>
			</main>
		</BrowserRouter>
	);
};
