import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MeetingsList from './MeetingsList.jsx';


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

	return (
		<Fragment>
			<CssBaseline />
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6">
						Meetings
					</Typography>
				</Toolbar>
			</AppBar>
			<main className={classes.content}>
				<MeetingsList />
			</main>
		</Fragment>
	);
};
