import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({
	url: String,
	title: String,
	_createdAt: {
		type: Date,
		index: 1,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {
					$setOnInsert: new Date()
				};
			} else {
				this.unset();
			}
		}
	},
	_updatedAt: {
		type: Date,
		index: 1,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	},
});

const Meetings = new Mongo.Collection('meetings');

Meetings.attachSchema(schema);

export default Meetings;
