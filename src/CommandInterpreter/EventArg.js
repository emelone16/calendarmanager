function parseEvent(arg, args) {
    const match = arg.match(/^"(.*)"$/);

    if (match) {
        args.event = match[1];
    }

    return args;
}

module.exports = parseEvent;