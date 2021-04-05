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


const AccountForm = ({ user = {}, updateUser }) => {
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const classes = useStyles();

	const handleUpdate = (form) => {
		updateUser.call(form, err => {
			if (err) {
				alert(err);
			} else {
				setShowSuccessMessage(true);
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
					Your account
				</Typography>
				<Formik
					onSubmit={handleUpdate}
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.emails[0].address,
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

export default AccountForm;
