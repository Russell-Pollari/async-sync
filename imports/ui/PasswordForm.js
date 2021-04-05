import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
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
}));


const Input = ({ field, ...rest }) => {
	return (
		<TextField {...field} {...rest} style={{ margin: 8 }}/>
	);
};


const PasswordForm = () => {
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const classes = useStyles();

	const handleUpdate = ({ currentPassword, newPassword }, callback) => {
		Accounts.changePassword(currentPassword, newPassword, err => {
			if (err) {
				alert(err);
			} else {
				setShowSuccessMessage(true);
				callback();
			}
		});
	};

	const handleCloseSnackBar = () => {
		setShowSuccessMessage(false);
	};

	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h6">
					Update your password
				</Typography>
				<Formik
					onSubmit={(values, actions) => handleUpdate(values, actions.resetForm)}
					initialValues={{
						currentPassword: '',
						newPassword: '',
					}}>
					{() => (
						<Form>
							<Field
								name="currentPassword"
								type="password"
								label="Current password"
								component={Input}
							/>
							<Field
								name="newPassword"
								type="password"
								label="New password"
								component={Input}
							/>
							<div style={{ textAlign: 'center' }}>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									type="submit">
									Update
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
					Account updated!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default PasswordForm;
