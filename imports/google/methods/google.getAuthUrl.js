import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


export const getAuthUrl = new ValidatedMethod({
	name: 'google.getAuthUrl',
	validate: null,

	async run() {
		if (Meteor.isServer) {
			const { getUrl } = await import('/imports/google/server/auth');
			const url = getUrl();
			return url;
		}
	},
});
