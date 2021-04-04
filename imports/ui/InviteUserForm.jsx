import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { createUser } from '/imports/api/methods/users.create';


const useStyles = makeStyles(theme => ({
	paper: {
		margin: 16,
		padding: 16,
		textAlign: 'left',
		position: 'relative',
	},
	button: {
		margin: 16,
	},
	container: {
		textAlign: 'center',
	},
	closeButton: {
		position: 'absolute',
		right: 8,
		top: 0,
	},
}));


const Input = ({ field, ...rest }) => {
	return (
		<TextField {...field} {...rest} style={{ margin: 8 }}/>
	);
};


const InviteUserForm = ({ close }) => {
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const classes = useStyles();

	const handleInviteUser = (form) => {
		createUser.call(form, (err) => {
			if (err) {
				alert(err);
			} else {
				setShowSuccessMessage(true);
			}
		});
	};

	const handleCloseSnackBar = (event, reason) => {
		setShowSuccessMessage(false);
	};


	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<IconButton
					onClick={close}
					className={classes.closeButton}>
					<CloseIcon />
				</IconButton>
				<Formik
					onSubmit={handleInviteUser}
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
					}}>
					{() => (
						<Form>
							<Field
								name="firstName"
								label="First name"
								component={Input}
							/>
							<Field
								name="lastName"
								label="Last name"
								component={Input}
							/>
							<Field
								name="email"
								label="Email"
								fullWidth
								component={Input}
							/>
							<div style={{ textAlign: 'center' }}>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									type="submit">
									Send invite
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Paper>
			<Snackbar
				open={showSuccessMessage}
				autoHideDuration={3000}
				onClose={handleCloseSnackBar}>
				<Alert onClose={handleCloseSnackBar} severity="success">
					User invited!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default InviteUserForm;
