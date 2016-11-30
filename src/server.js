/**
 * Created by rviscuso on 11/29/16.
 */

const express = require('express');
const bodyParser = require('body-parser');
const util = require('./util');
const ip = require('ip');

let serverPort = process.argv[2] || 8080;

var app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${(new Date()).toISOString()}, ${req.ip}, ${req.url}`);
    next()
});

function info(req, res) {
    util.thisContainerInfo((err, out) => {
        if(err){
            //console.error(err)
            out = {}
        }
        out.requestIp = req.ip;
        out.serverIp = ip.address();
        res.json(out);
    })
}

app.get('/', info);

app.get('/info', info);

app.post('/ping', (req, res) => {
    let hostName = req.body.hostName || req.body.hostname || req.body.host;
    util.pingS(hostName)
        .pipe(res);
});

app.post('/http', (req, res) => {
    let url = req.body.url || req.body.URL || req.body.Url;
    util.httpS(url)
        .pipe(res);
});

app.post('/telnet', (req, res) => {
    let hostName = req.body.hostName || req.body.hostname || req.body.host;
    let port = req.body.port;

    util.telnet(hostName, port, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else {
            res.send(data)
        }
    })
});

app.listen(serverPort, () => {
    console.log('Server started');
});