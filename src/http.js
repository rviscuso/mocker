/**
 * Created by rviscuso on 11/29/16.
 */

const du = require('./util/docker');

let url = process.argv[2];

if(!url){
    console.error('url parameter missing');
    process.exit(1);
}

du.httpS(url)
    .pipe(process.stdout);