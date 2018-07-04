const {google} = require('googleapis');
const CalendarId = require('./CalendarId');

class CalendarManager {

    constructor(auth) {
        this.auth = auth
        this.calendar = google.calendar({version: 'v3', auth: this.auth});
        this.calendarId = 'primary';
        this.currentCalendar = 'primary';
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
            calendarId: this.calendarId,
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

    switchCalendar(id) {
        if(CalendarId[id]) {
            this.calendarId = CalendarId[id];
            this.currentCalendar = id;
            process.stdout.write("Switched to: " + id + "\n> ");
        } else {
            process.stdout.write("Error: Unknown ID\n> ");
        }
    }
}

module.exports = CalendarManager