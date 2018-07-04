const fs = require('fs');

const CalendarId = new function() {
    try {
        const file = fs.readFileSync("./config/calendar_ids.json");
        fileJson = JSON.parse(file);

        return fileJson;
    } catch (err) {
        console.log('Error: ' + err);
    }
}

module.exports = CalendarId;