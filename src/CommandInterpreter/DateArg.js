const precedingZero = function(num) {
    return num < 10 ? "0" : ""
};

function parseDate(arg, args) {
    var match = arg.match(/^(\d{4})\-(\d{2})\-(\d{2})$/);

    if (match) {
        args.date = match[1] + "-" + match[2] + "-" + match[3]
        return args;
    }

    match = arg.match(/^(\d{1,2})\-(\d{1,2})\-(\d{4})$/);

    if (match) {
        args.date = match[3] + "-" + precedingZero(match[1]) + match[1] + "-" + precedingZero(match[2]) + match[2];
        return args;
    }

    match = arg.match(/^(\d{1,2})\-(\d{1,2})\-(\d{2})$/);

    if (match) {
        args.date = "20" + match[3] + "-" + precedingZero(match[1]) + match[1] + "-" + precedingZero(match[2]) + match[2];
        return args;
    }

    if (arg == "today") {
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        args.date = (year + "-" + precedingZero(month) + month + "-" + precedingZero(day) + day);
        return args;
    }

    return args;
}

module.exports = parseDate;