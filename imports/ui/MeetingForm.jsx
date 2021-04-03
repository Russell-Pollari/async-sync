import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { createMeeting } from '/imports/api/methods/meetings.create';

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
		<TextField
			variant="filled"
			{...field}
			{...rest}
			style={{ margin: '8px' }}
		/>
	);
};


const MeetingForm = () => {
	const classes = useStyles();

	const handleSumbit = (form) => {
		form['date'] = new Date(form['date']);

		createMeeting.call(form, err => {
			if (err) {
				alert(err);
			}
		});
	}

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h6">
					Create a meeting
				</Typography>
				<Formik
					onSubmit={handleSumbit}
					initialValues={{
						title: '',
						url: '',
						description: '',
						date: '',
					}}>
					{() => (
						<Form>
							<Field
								name="title"
								label="Title"
								fullWidth
								component={Input}
							/>
							<Field
								name="url"
								label="URL"
								fullWidth
								component={Input}
							/>
							<Field
								name="date"
								label="Date"
								type="date"
								fullWidth
								component={Input}
							/>
							<Field
								name="description"
								label="Description"
								multiline
								rows={4}
								fullWidth
								component={Input}
							/>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
								type="submit">
								Create meeting
							</Button>
						</Form>
					)}
				</Formik>
			</Paper>
		</Container>
	);
};

export default MeetingForm;
