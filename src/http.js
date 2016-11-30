/**
 * Created by rviscuso on 11/29/16.
 */

const util = require('./util');

let url = process.argv[2];

if(!url){
    console.error('url parameter missing');
    process.exit(1);
}

util.httpS(url)
    .pipe(process.stdout);