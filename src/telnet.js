/**
 * Created by rviscuso on 11/29/16.
 */

const util = require('./util');

let hostName = process.argv[2];
let port = process.argv[3];

if(!hostName || !port){
    console.error('Usage: telnet <hostName> <port>');
    process.exit(1);
}

util.telnet(hostName, port, (err, data) => {
    if(err){
        console.error(err);
        process.exit(1);
    }
    else {
        console.log(data);
    }
});