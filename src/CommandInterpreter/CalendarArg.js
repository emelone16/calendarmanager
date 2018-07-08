function parseCalendar(arg, args) {
    const match = arg.match(/^[a-zA-Z]{4}[0-9]{3}$/);

    if (match) {
        args.calendar = arg;
    }

    if (arg == "primary") {
        args.calendar = arg;
    }

    return args;
}

module.exports = parseCalendar;