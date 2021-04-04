import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import Meetings from '/imports/api/collections/Meetings';
import MeetingCard from '/imports/ui/MeetingCard';
import { createMeeting } from '/imports/api/methods/meetings.create';

import MeetingForm from '/imports/ui/MeetingForm';


const MeetingsList = () => {
	const [showForm, setShowForm] = useState(false);

	const loading = useTracker(() => {
		const sub = Meteor.subscribe('meetings');
		return !sub.ready();
	}, []);

	const meetings = useTracker(() => {
		return Meetings.find({}, {
			sort: {
			_createdAt: -1
			}
		}).fetch();
	}, []);


	return (
		<div >
			{showForm ?  (
				<MeetingForm close={() => setShowForm(false)} />
			) : (
				<div style={{ textAlign: 'right', margin: 16 }}>
					<Button
						color="primary"
						startIcon={<AddIcon />}
						variant="contained"
						onClick={() => setShowForm(true)}>
						Add meeting
					</Button>
				</div>
			)}
			{meetings.map(meeting => (
				<MeetingCard key={meeting._id} {...meeting} />
			))}
		</div>
	);
};

export default MeetingsList;
