const CalendarManager = require("./CalendarManager");
const CalendarAuthorizer = require("./CalendarAuthorizer");
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
        });

    }

    process(line) {
        if(line == "exit") {
            this.rl.close();
        } else if(line.match(/^create \"([\w\s\-]+)\" (\d+)\-(\d+)\-(\d+)$/)) {
            const args = line.match(/^create \"([\w\s\-]+)\" (\d+)\-(\d+)\-(\d+)$/);
            this.manager.createAssignment(args[1], args[2] + "-" + args[3] + "-" + args[4]);
        } else if(line.match(/^switch (\w+)$/)) {
            const args = line.match(/^switch (\w+)$/)
            this.manager.switchCalendar(args[1]);
        } else if(line.match(/^currentCalendar$/)) {
            process.stdout.write(this.manager.currentCalendar + "\n> ");
        } else {
            const args = line.match(/^(\w+)/)
            console.log("Could not recognize command: " + args[1])
            process.stdout.write("> ");
        }
    }

}

module.exports = CalendarShell;