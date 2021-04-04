import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const createAccount = (form) => {
	Accounts.createUser(form, (err) => {
		if (err) {
			alert(err);
		}
	});
};


const login = ({ email, password }) => {
	Meteor.loginWithPassword(email, password, (err) => {
		if (err) {
			alert(err);
		}
	})
}

const useStyles = makeStyles(theme => ({
	paper: {
		maxWidth: 512,
		width: '100%',
		padding: 16,
		display: 'inline-block',
	},
	container: {
		textAlign: 'center',
	},
	button: {
		margin: 16,
	}
}));


const Input = ({ field, ...rest }) => {
	return (
		<TextField {...field} {...rest} />
	);
};


const LoginForm = () => {
	const classes = useStyles();
	const [action, setAction] = useState('login');

	const toggleAction = () => {
		if (action === 'login') {
			setAction('register');
		} else {
			setAction('login');
		}
	}

	return (
		<Fragment>
			<Paper className={classes.paper}>
				<Typography variant="h6">
					{action === 'login' ? 'Login' : 'Register'}
				</Typography>
				<Formik
					onSubmit={action === 'login' ? login : createAccount}
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
								{action === 'login' ? 'Login' : 'Create account'}
							</Button>
						</Form>
					)}
				</Formik>
			</Paper>
			<div>
				<Button onClick={toggleAction}>
					{action === 'login' ? 'Create account' : 'Login'}
				</Button>
			</div>
		</Fragment>
	);
};

export default LoginForm;
