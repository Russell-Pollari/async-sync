import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';


const logout = () => Meteor.logout();


const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
	},
	drawerHeader: {
		textAlign: 'right',
	},
}));


const Menu = ({ open, toggle }) => {
	const classes = useStyles();

	return (
		<Drawer
			className={classes.drawer}
			classes={{
				paper: classes.drawer,
			}}
			open={open}
			anchor="left"
			>
			<div className={classes.drawerHeader}>
				<IconButton onClick={toggle}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button>
						<ListItemIcon>
							<DescriptionIcon />
						</ListItemIcon>
						<ListItemText>
							Meetings
						</ListItemText>
					</ListItem>
				</RouterLink>
				<RouterLink to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button>
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText>
							Users
						</ListItemText>
					</ListItem>
				</RouterLink>
				<ListItem button onClick={logout}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText>
						Logout
					</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Menu;
