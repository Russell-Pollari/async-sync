import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Meetings from '/imports/api/collections/Meetings';
import MeetingCard from '/imports/ui/MeetingCard';
import { createMeeting } from '/imports/api/methods/meetings.create';


const MeetingsList = () => {
	const meetings = useTracker(() => {
		return Meetings.find().fetch();
	});

	const handleCreateMeeting = () => {
		createMeeting.call({
			title: 'new meeting',
			url: 'https:/google.com',
		});
	};

	return (
		<div>
			{meetings.map(meeting => (
				<MeetingCard key={meeting._id} {...meeting} />
			))}
			<button onClick={handleCreateMeeting}>
				Create meeting
			</button>
		</div>
	);
};

export default MeetingsList;
