const db = require('../db/db');

const functions = [
    '--truncate-tracks',
    '-tt'
];

if (process.argv[2] == null || process.argv[2] == '') {
    console.error('\x1b[31m%s\x1b[0m', 'Needs at least 1 argument. Options : ' + functions);
    return 1;
}

switch (process.argv[2]) {
    case '--truncate-tracks':
    case '-tt':
        db.query(`TRUNCATE public."Track"`, (err, response) => {
            if (err) {
                console.error('\x1b[31m%s\x1b[0m', 'PostgreSQL query failed');
                console.error('\x1b[31m%s\x1b[0m', JSON.stringify(err));
                return 1;
            } else {
                console.log('\x1b[32m%s\x1b[0m', 'PostgreSQL query successful');
                console.log('\x1b[32m%s\x1b[0m', JSON.stringify(response));
                return 0;
            }
        });
        break;
    default:
        console.error('\x1b[31m%s\x1b[0m', 'Function not implemented. Options :' + functions);
        return 1;
}

return 0;


/* CONSOLE FONT STYLE REFERENCE
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
*/