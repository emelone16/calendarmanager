const EventArg = require('./EventArg');
const DateArg = require('./DateArg');
const CalendarArg = require('./CalendarArg');

const argumentManager = {
    "<event>": EventArg,
    "<date>": DateArg,
    "<calendar>": CalendarArg
};

module.exports = argumentManager;