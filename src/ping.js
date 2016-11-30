/**
 * Created by rviscuso on 11/29/16.
 */

const du = require('./util/docker');

let hostName = process.argv[2];

if(!hostName){
    console.error('hostName parameter missing');
    process.exit(1);
}

du.pingS(hostName)
    .pipe(process.stdout)