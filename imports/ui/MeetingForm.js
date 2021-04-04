import React from 'react';

import { Formik, Form, Field } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { createMeeting } from '/imports/api/methods/meetings.create';

const useStyles = makeStyles(() => ({
	paper: {
		padding: 16,
		margin: 16,
		textAlign: 'center',
		position: 'relative',
	},
	button: {
		margin: 16,
	},
	closeButton: {
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


const MeetingForm = ({ close }) => {
	const classes = useStyles();

	const handleSumbit = (form) => {
		// TODO: use a client-side schema to clean, transform and validate
		// Probably yup, or maybe simpl-schema
		form['date'] = new Date(form['date']);

		createMeeting.call(form, err => {
			if (err) {
				alert(err);
			} else {
				close();
			}
		});
	};

	return (
		<Paper className={classes.paper}>
			<IconButton
				onClick={close}
				className={classes.closeButton}>
				<CloseIcon />
			</IconButton>

			<Typography variant="h6">
				Add a meeting
			</Typography>
			<Formik
				onSubmit={handleSumbit}
				initialValues={{
					title: '',
					meetingDocURL: '',
					description: '',
					date: '',
				}}>
				{() => (
					<Form>
						<Field
							autoFocus
							name="title"
							label="Title"
							fullWidth
							component={Input}
						/>
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
		</Paper>
	);
};

export default MeetingForm;
