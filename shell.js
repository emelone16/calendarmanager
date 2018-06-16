var CalendarManager = require("./CalendarManager");
var CalendarAuthorizer = require("./CalendarAuthorizer");

var authorizer = new CalendarAuthorizer();

var manager = new CalendarManager(authorizer.oAuth2Client);
manager.listEvents();