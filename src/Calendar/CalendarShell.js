const CalendarAuthorizer = require("./CalendarAuthorizer");
const CalendarCommands = require('./CalendarCommands');
const CalendarManager = require("./CalendarManager");
const CommandInterpreter = require("../CommandInterpreter/CommandInterpreter");
const readline = require("readline");

class CalendarShell {

    constructor() {
        this.authorizer = new CalendarAuthorizer();
        this.manager = new CalendarManager(this.authorizer.oAuth2Client);
        this.running = false;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.running = true;

        process.stdout.write("> ");

        this.rl.on('line', (input) => {
            this.process(input);
            process.stdout.write("> ");
        });

    }

    process(line) {
        if (line == "exit") {
            this.rl.close();
        } else {
            const command = line.match(/^([a-z]+)/);
            const commandFormat = CalendarCommands.getCommandFormat(command[1]);
            
            if (!commandFormat) {
                return;
            }

            const commandExp = new CommandInterpreter(commandFormat);
            const args = commandExp.findArgumentValues(line);

            if (args) {
                this.manager.execute(args);
            }
        }
    }

}

module.exports = CalendarShell;