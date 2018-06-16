const {google} = require('googleapis')

class CalendarManager {

    constructor(auth) {
        this.auth = auth;
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */

    listEvents() {
        const auth = this.auth;
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
            }, (err, {data}) => {
                if (err) return console.log('The API returned an error: ' + err);
                const events = data.items;
                if (events.length) {
                    console.log('Upcoming 10 events:');
                    events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    console.log(`${start} - ${event.summary}`);
                    });
                } else {
                    console.log('No upcoming events found.');
                }
        });
    }

}

module.exports = CalendarManager;