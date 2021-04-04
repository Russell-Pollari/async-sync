import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const login = ({ email, password }) => {
	Meteor.loginWithPassword(email, password, (err) => {
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


const LoginForm = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Formik
					onSubmit={login}
					initialValues={{
						email: '',
						password: '',
					}}>
					{() => (
						<Form>
							<Field
								name="email"
								label="Email"
								fullWidth
								component={Input}
								/>
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

export default LoginForm;
