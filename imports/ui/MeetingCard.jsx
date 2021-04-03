import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 512,
		width: '100%',
		margin: 16,
	},
	title: {
		flexGrow: 1,
	},

});

const MeetingCard = ({ title, url, description, date }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<div style={{ display: 'flex' }}>
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
					<a href={url} target="_blank">
						{url}
					</a>
				</Typography>
				<Typography variant="body2" component="p">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
};

export default MeetingCard;
