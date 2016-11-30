/**
 * Created by rviscuso on 11/29/16.
 */

const du = require('./util/docker');

du.thisContainerInfo((err, out) => {
    console.log(JSON.stringify(out, null, 2));
});
