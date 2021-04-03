import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

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
		<div>
			<button onClick={() => setShowForm(true)}>
				Create meeting
			</button>
			{showForm && (
				<MeetingForm />
			)}
			{meetings.map(meeting => (
				<MeetingCard key={meeting._id} {...meeting} />
			))}
		</div>
	);
};

export default MeetingsList;
