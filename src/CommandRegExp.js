class CommandInterpreter {

    constructor(format) {
        this.format = format;
        this.currentFormat;
    }

    findArgumentValues(line) {
        var lineArgs = line.split(' ');
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

}

module.exports = CommandInterpreter;