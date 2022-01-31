import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


export const createWeekly = new ValidatedMethod({
	name: 'google.createWeekly',
	validate: null,

	async run({ dateString, ...todos }) {
		if (Meteor.isServer) {
			const { createWeekly } = await import('/imports/google/server/createWeekly');
			try {
				return await createWeekly(dateString, todos);
			} catch {
				throw new Meteor.Error('authentication-error', 'Error authenicating google');
			}
		}
	},
});
