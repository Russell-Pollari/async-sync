import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const resetPassword = (token, password ) => {
	Accounts.resetPassword(token, password, (err) => {
		if (err) {
			alert(err);
		}
	})
}

const useStyles = makeStyles(theme => ({
	paper: {
		margin: 16,
		maxWidth: 512,
		padding: 16,
		textAlign: 'center',
		display: 'inline-block',
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
		<TextField {...field} {...rest} />
	);
};


const EnrollForm = () => {
	const { code } = useParams();
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div>
				<Typography variant="h5" element="p">
					Welcome
				</Typography>
			</div>
			<Paper className={classes.paper}>
				<Typography>
					Set a password and login
				</Typography>
				<Formik
					onSubmit={values => resetPassword(code, values.password)}
					initialValues={{
						password: '',
					}}>
					{() => (
						<Form>
							<Field
								name="password"
								label="Password"
								type="password"
								fullWidth
								component={Input}
							/>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
								type="submit">
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Paper>
		</div>
	);
};

export default EnrollForm;
