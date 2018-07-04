class CommandInterpreter {

    constructor(format) {
        this.format = format;
        this.currentFormat;
    }

    // Makes sure that spaces within quotes do not split into separate parts.
    splitLineIntoArgs(line) {
        var splitLineArgs = line.split(' ');
        var lineArgs = [];
        var argsToCombine = [];
        var inQuote = false;

        splitLineArgs.forEach(function(arg) {
            if (arg.includes('"') || inQuote) {
                var match = arg.match(/^\".*\"$/);

                if (!match) {
                    argsToCombine.push(arg);
                    
                    if (arg.includes('"') && argsToCombine.length > 1) {
                        lineArgs.push(argsToCombine.join(' '));
                        argsToCombine = [];
                        inQuote = false;
                    } else {
                        inQuote = true;
                    }
                } else {
                    lineArgs.push(arg);
                }
            } else {
                lineArgs.push(arg);
            }
        })

        return lineArgs;
    }

    findArgumentValues(line) {
        var lineArgs = this.splitLineIntoArgs(line);
        var args = {};

        if (this.format.length != lineArgs.length) {
            console.log("Invalid Format for Command: " + lineArgs[0]);
            return;
        }

        if (this.format[0] != lineArgs[0]) {
            console.log("This should never happen");
            return;
        }

        this.currentFormat = 1;
        args.command = lineArgs[0];

        while (this.currentFormat < this.format.length) {
            if (this.format[this.currentFormat] == "<event>") {
                args.event = this.parseEvent(lineArgs[this.currentFormat]);

                if (args.event) {
                    this.currentFormat += 1
                } else {
                    console.log("ERROR -> Could not parse event.");
                    return;
                }
            } else if (this.format[this.currentFormat] == "<date>") {
                args.date = this.parseDate(lineArgs[this.currentFormat]);

                if (args.date) {
                    this.currentFormat += 1
                } else {
                    console.log("ERROR -> Could not parse date.");
                    return;
                }
            } else if (this.format[this.currentFormat] == "<calendar>") {
                args.calendar = this.parseCalendar(lineArgs[this.currentFormat]);

                if (args.calendar) {
                    this.currentFormat += 1;
                } else {
                    console.log("ERROR -> Could not parse calendar.");
                    return;
                }
            }
        }

        return args;
    }

    parseEvent(arg) {
        const match = arg.match(/^"(.*)"$/);

        if (match) {
            return match[1];
        }
    }

    parseDate(arg) {
        const match = arg.match(/(\d+)\-(\d+)\-(\d+)/);

        if (match) {
            return match[1] + "-" + match[2] + "-" + match[3]
        }
    }

    parseCalendar(arg) {
        const match = arg.match(/[a-zA-Z]{4}[0-9]{3}/);

        if (match) {
            return arg;
        }

        if (arg == "primary") {
            return arg;
        }
    }

}

module.exports = CommandInterpreter;