import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const baseSchema = new SimpleSchema({
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

export default baseSchema;
