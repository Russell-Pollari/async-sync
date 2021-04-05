# Async / Sync

Collaborate on async meetings with a team

## Development

### Install

1. Install [meteor](https://www.meteor.com/developers/install)

2. `npm install`

### Run
In order to get the Google Drive integration working, you'll need a settings.json file that looks like this:
```json
{
	"private": {
		"GOOGLE_CLIENT_ID": "",
		"GOOGLE_CLIENT_SECRET": "",
		"GOOGLE_REDIRECT_URL": "",
		"GOOGLE_DRIVE_FOLDER_ID": ""
	}
}
```
`npm run start` to run a local server on port 3000

## Usage
With an empty db, will create a user with credentials
```
email: 'admin@admin.com',  
password: 'admin',
```
You should login and change the account details as a first step.
___
- Meteor will spin up a local MongoDB for you. but, if deploying, you'll
need to set `MONGO_URL` env variable
- You can invite users, but will need a `MAIL_URL` env variable set
- Warning: everyone is an admin and can delete other users (for now)
