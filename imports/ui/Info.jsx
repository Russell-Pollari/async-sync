import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Meetings from '/imports/api/collections/Meetings';
import { createMeeting } from '/imports/api/methods/meetings.create';


export const MeetingsList = () => {
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
			<h2>Meetings</h2>
			<ul>
				{meetings.map(meeting => (
					<li key={meeting._id}>
						<a href={meeting.url} target="_blank">
							{meeting.title}
						</a>
					</li>
				))}
			</ul>
			<button onClick={handleCreateMeeting}>
				Create meeting
			</button>
		</div>
	);
};
