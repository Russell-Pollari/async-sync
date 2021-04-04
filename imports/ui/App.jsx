import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState, Fragment } from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Link as RouterLink,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './Menu';
import MeetingsList from './MeetingsList';
import Account from './Account';
import LoginForm from './LoginForm';
import EnrollAccount from './EnrollAccount';


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
						Async/Sync
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
							<Route path="/account">
								<Account />
							</Route>
							<Route>
								<MeetingsList />
							</Route>
						</Switch>
					)}
				</Container>
			</main>
		</BrowserRouter>
	);
};
