/**
 * Created by rviscuso on 11/29/16.
 */

const util = require('./util');

let hostName = process.argv[2];

if(!hostName){
    console.error('hostName parameter missing');
    process.exit(1);
}

util.pingS(hostName)
    .pipe(process.stdout);