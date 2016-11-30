/**
 * Created by rviscuso on 11/29/16.
 */

const exec = require('child_process').exec;
const Docker = require('dockerode');
const docker = new Docker();
const spawn = require('child_process').spawn;
const request = require('request')

module.exports = {

    thisContainerId: (callback) => {
        exec('basename "$(head /proc/1/cgroup)"', (err, stdout, stderr) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, stdout.trim());
            }
        })
    },

    getContainerInfo: (containerId, callback) => {
        let out = {};
        out.containerEnv = process.env;
        out.containerId = containerId;
        docker.getContainer(containerId).inspect((err, info) => {
            if (err) {
                callback(err, out)
            }
            else {
                out.containterInspect = info;
                callback(null, out);
            }
        })
    },

    thisContainerInfo: (callback) => {
        module.exports.thisContainerId((err, cid) => {
            if(err){
                callback(err);
            }
            else {
                return module.exports.getContainerInfo(cid, callback);
            }
        })
    },

    pingS: (hostname) => {
        let cp = spawn('ping', [hostname, '-w', 5]);
        return cp.stdout;

    },

    httpS: (url) => {
        return request(url);
    }
}