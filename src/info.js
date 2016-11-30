/**
 * Created by rviscuso on 11/29/16.
 */

const util = require('./util');

util.thisContainerInfo((err, out) => {
    if(err){
        console.error(err.message);
    }
    else {
        console.log(JSON.stringify(out, null, 2));
    }
});
