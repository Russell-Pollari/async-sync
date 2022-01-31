import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAuthUrl } from '/imports/google/methods/google.getAuthUrl';
import { createWeekly } from '/imports/google/methods/google.createWeekly';
import { createMeeting } from '/imports/api/methods/meetings.create';

const useStyles = makeStyles(() => ({
	paper: {
		padding: 16,
		margin: 16,
		textAlign: 'center',
		position: 'relative',
	},
	title: {
		margin: 16,
	},
	button: {
		margin: 16,
	},
	googleButton: {
		position: 'absolute',
		right: 8,
		top: 0,
	},
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


const AddMeeting = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [docId, setDocId] = useState(null);

	const handleGoogleClick = () => {
		getAuthUrl.call((err, result) => {
			if (err) {
				alert(err);
			} else {
				location.href = result;
			}
		});
	};

	const handleSubmit = (form) => {
		setLoading(true);
		form['date'] = new Date(form['date']);
		const dateString = form['date'].toISOString().slice(0,10);

		createWeekly.call({ dateString, ...form }, (err, result) => {
			if (err) {
				console.error(err);
				setLoading(false);
			}
			if (result) {
				createMeeting.call({
					meetingDocURL: `https://docs.google.com/document/d/${result}`,
					title: dateString,
					description: `${dateString} Weekly meeting`,
					date: form['date'],
				}, err => {
					if (!err) {
						setDocId(result);
						setLoading(false);
					}
				});
			}
		});
	};

	if (docId) {
		return (
			<Redirect to="/" />
		);
	}

	return (
		<Paper className={classes.paper}>
			<Button onClick={handleGoogleClick} className={classes.googleButton}>
				Authorize Google
			</Button>
			<Typography variant="h6" className={classes.title}>
				Add a meeting
			</Typography>
			<Formik
				onSubmit={(values) => {
					handleSubmit(values);
				}}
				initialValues={{
					date: '',
					russ: '',
					ale: '',
					rose: '',
				}}>
				{() => (
					<Form>
						<Field
							name="date"
							label="Date"
							type="date"
							fullWidth
							component={Input}
						/>
						<Field
							name="russ"
							label="Russ todos"
							multiline
							rows={4}
							fullWidth
							component={Input}
						/>
						<Field
							name="ale"
							label="Ale todos"
							multiline
							rows={4}
							fullWidth
							component={Input}
						/>
						<Field
							name="rose"
							label="Rose todos"
							multiline
							rows={4}
							fullWidth
							component={Input}
						/>
						<Button
							disabled={loading}
							className={classes.button}
							variant="contained"
							startIcon={<AddIcon />}
							color="primary"
							type="submit">
							{loading ? <CircularProgress /> : 'Create meeting doc'}
						</Button>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

export default AddMeeting;
