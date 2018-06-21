const {google} = require('googleapis')

class CalendarManager {

    constructor(auth) {
        this.auth = auth
        this.calendar = google.calendar({version: 'v3', auth: this.auth});
    }

    createAssignment(summary, date) {
        var event = {
            'summary': summary,
            'start': {
                'date': date,
            },
            'end': {
                'date': date,
            },
        };
          
        this.calendar.events.insert({
            auth: this.auth,
            calendarId: 'primary',
            resource: event,
        }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.data.htmlLink);
            process.stdout.write("> ");
        });
    }
}

module.exports = CalendarManager