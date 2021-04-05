import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import { createDoc } from '/imports/google/methods/google.createDoc';
import { getAuthUrl } from '/imports/google/methods/google.getAuthUrl';
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
	const [loadingGoogleDoc, setLoadingGoogleDoc] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const classes = useStyles();

	const handleCloseSnackBar = () => {
		setShowSuccessMessage(false);
	};

	const handleGoogleClick = () => {
		getAuthUrl.call((err, result) => {
			if (err) {
				alert(err);
			} else {
				location.href = result;
			}
		});
	};


	const handleGoogleDocClick = (setFieldValue) => () => {
		setLoadingGoogleDoc(true);
		createDoc.call((err, docId) => {
			setLoadingGoogleDoc(false);
			if (err) {
				alert(err);
			} else {
				setFieldValue('meetingDocURL', 'https://docs.google.com/document/d/' + docId);
			}
		});
	};

	const handleSumbit = (form, callback) => {
		// TODO: use a client-side schema to clean, transform and validate
		// Probably yup, or maybe simpl-schema
		form['date'] = new Date(form['date']);

		createMeeting.call(form, err => {
			if (err) {
				alert(err);
			} else {
				setShowSuccessMessage(true);
				callback();
			}
		});
	};

	return (
		<Paper className={classes.paper}>
			<Button onClick={handleGoogleClick} className={classes.googleButton}>
				Authorize Google
			</Button>
			<Typography variant="h6" className={classes.title}>
				Add a meeting
			</Typography>
			<Formik
				onSubmit={(values, actions) => {
					handleSumbit(values, actions.resetForm);
				}}
				initialValues={{
					title: '',
					meetingDocURL: '',
					description: '',
					date: '',
				}}>
				{({ values, setFieldValue }) => (
					<Form>
						<Field
							autoFocus
							name="title"
							label="Title"
							fullWidth
							component={Input}
						/>
						{!values.meetingDocURL && (
							loadingGoogleDoc ? (
								<CircularProgress />
							) : (
								<Button
									variant="contained"
									color="primary"
									startIcon={<InsertDriveFileIcon />}
									onClick={handleGoogleDocClick(setFieldValue)}>
									Create google doc
								</Button>
							)
						)}
						<Field
							name="meetingDocURL"
							label="Meeting doc"
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
							startIcon={<AddIcon />}
							color="primary"
							type="submit">
							Add meeting
						</Button>
					</Form>
				)}
			</Formik>
			<Snackbar
				open={showSuccessMessage}
				autoHideDuration={3000}
				onClose={handleCloseSnackBar}>
				<Alert onClose={handleCloseSnackBar} severity="success">
					Meeting created!
				</Alert>
			</Snackbar>
		</Paper>
	);
};

export default AddMeeting;
