import { Meteor } from 'meteor/meteor';

import { createMeeting } from '/imports/api/methods/meetings.create';
import { archiveMeeting } from '/imports/api/methods/meetings.archive';
import '/imports/api/publications/meetings';


Meteor.startup(() => {});
