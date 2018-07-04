const fs = require('fs');

var commandsJson;

try {
    const file = fs.readFileSync("./config/calendar_commands.json");
    commandsJson = JSON.parse(file);
} catch (err) {
    console.log('Error: ' + err);
}

function getCommandFormat(command) {
    commandFormat = commandsJson[command];
    
    if (commandFormat) {
        commandArguments = commandFormat.split(' ');
        commandArguments.unshift(command);

        return commandArguments;
    } else {
        console.log("ERROR -> Could not recognize command: " + command);
    }
}

module.exports = {
    getCommandFormat
};