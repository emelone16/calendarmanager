const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'credentials.json';

class CalendarAuthorizer {

    constructor() {
        try {
            const content = fs.readFileSync('client_secret.json');
            this.authorize(JSON.parse(content));
          } catch (err) {
            return console.log('Error loading client secret file:', err);
          }
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     * @return {function} if error in reading credentials.json asks for a new one.
     */

    authorize(credentials) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        let token = {};
        this.oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
    
        // Check if we have previously stored a token.
        try {
            token = fs.readFileSync(TOKEN_PATH);
        } catch (err) {
            return this.getAccessToken(this.oAuth2Client);
        }

        this.oAuth2Client.setCredentials(JSON.parse(token));
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */

    getAccessToken(oAuth2Client) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();

            oAuth2Client.getToken(code, (err, token) => {
                if (err) return callback(err);
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                try {
                    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                    console.log('Token stored to', TOKEN_PATH);
                } catch (err) {
                    console.error(err);
                }
            });
        });
    }

}

module.exports = CalendarAuthorizer