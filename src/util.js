/**
 * Created by rviscuso on 11/29/16.
 */

const exec = require('child_process').exec;
const Docker = require('dockerode');
const docker = new Docker();
const spawn = require('child_process').spawn;
const request = require('request');
const Telnet = require('telnet-client');

module.exports = {

    thisContainerId: (callback) => {
        exec('basename "$(head /proc/1/cgroup)"', (err, stdout) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, stdout.trim());
            }
        })
    },

    getContainerInfo: (containerId, callback) => {
        if(!containerId){
            return callback(new Error("Invalid containerId"))
        }
        docker.getContainer(containerId).inspect((err, info) => {
            if (err) {
                callback(err)
            }
            else {
                callback(null, info);
            }
        })
    },

    thisContainerInfo: (callback) => {
        module.exports.thisContainerId((err, cid) => {
            let out = {};
            out.containerEnv = process.env;
            if(err){
                return callback(null, out);
            }
            else {
                out.containerId = cid;
                return module.exports.getContainerInfo(cid, (err, info) => {
                    if(err) {
                        callback(err);
                    }
                    else {
                        out.containerInfo = info;
                        return callback(null, out);
                    }
                });
            }
        })
    },

    pingS: (hostname) => {
        let cp = spawn('ping', [hostname, '-w', 5]);
        return cp.stdout;

    },

    httpS: (url) => {
        return request(url);
    },

    telnet: (hostname , port, callback) => {
        let connection = new Telnet();

        let params = {
            host: hostname,
            port: port,
            timeout: 300,
        };

        connection.on('error', function(err){
            callback(err);
        });

        connection.on('connect', function(){
            callback(null, 'Connected.');
        });

        connection.on('timeout', function() {
            connection.end();
        });

        connection.connect(params);
    }
};