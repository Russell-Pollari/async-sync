import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import { archiveMeeting } from '/imports/api/methods/meetings.archive';

const useStyles = makeStyles({
	root: {
		margin: 16,
	},
	cardHeader: {
		display: 'flex',
	},
	title: {
		flexGrow: 1,
	},
});


const MeetingCard = ({
	_id,
	title,
	meetingDocURL,
	description,
	date,
}) => {
	const classes = useStyles();

	const handleArchiveClick = () => {
		archiveMeeting.call({ meetingId: _id }, (err) => {
			if (err) {
				alert(err);
			}
		});
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className={classes.cardHeader}>
					<Typography variant="h5" component="h2" className={classes.title}>
						{title}
					</Typography>
					{date && (
						date.toLocaleDateString('en-us', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})
					)}
				</div>
				<Typography variant="body2" component="p">
					<a href={meetingDocURL} target="_blank">
						Meeting doc
					</a>
				</Typography>
				<Typography variant="body2" component="p">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					startIcon={<DeleteIcon /> }
					color="secondary"
					onClick={handleArchiveClick}>
					Archive
				</Button>
			</CardActions>
		</Card>
	);
};

export default MeetingCard;
