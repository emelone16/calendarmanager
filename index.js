const CalendarManager = require("./CalendarManager");
const CalendarAuthorizer = require("./CalendarAuthorizer");

const authorizer = new CalendarAuthorizer();
const manager = new CalendarManager(authorizer.oAuth2Client);

manager.createAssignment("Yay!", "2018-06-20");