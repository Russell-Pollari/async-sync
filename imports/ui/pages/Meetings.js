import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import MeetingCard from '/imports/ui/MeetingCard';
import MeetingsCollection from '/imports/api/collections/Meetings';
import { getAuthUrl } from '/imports/google/methods/google.getAuthUrl';


const MeetingsPage = () => {
	const loading = useTracker(() => {
		const sub = Meteor.subscribe('meetings');
		return !sub.ready();
	}, []);

	const meetings = useTracker(() => {
		return MeetingsCollection.find({}, {
				sort: {
					_createdAt: -1,
			},
		}).fetch();
	}, []);


	const handleGoogleClick = () => {
		getAuthUrl.call((err, result) => {
			if (err) {
				alert(err);
			} else {
				location.href = result;
			}
		});
	};

	return (
		<Fragment>
			<Button onClick={handleGoogleClick}>
				Authorize Google
			</Button>
			<div style={{ textAlign: 'right', margin: 16 }}>
				<Button
					to="/add-meeting"
					component={RouterLink}
					color="primary"
					startIcon={<AddIcon />}
					variant="contained">
					Add meeting
				</Button>
			</div>
			{loading ? (
				<CircularProgress />
			) : (
				meetings.map(meeting => (
					<MeetingCard key={meeting._id} {...meeting} />
				))
			)}
		</Fragment>
	);
};

export default MeetingsPage;
