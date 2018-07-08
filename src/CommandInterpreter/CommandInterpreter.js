const ArgumentManager = require('./ArgumentManager');

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
            const stringArg = this.format[this.currentFormat];
            const currentArg = ArgumentManager[stringArg];

            args = currentArg(lineArgs[this.currentFormat], args);

            const match = stringArg.match(/\<(.+)\>/);
            const str = match[1];
            
            if (args[str]) {
                this.currentFormat += 1;
            } else {
                console.log("ERROR -> Could not parse " + str + ".");
                return;
            }
        }

        return args;
    }

}

module.exports = CommandInterpreter;