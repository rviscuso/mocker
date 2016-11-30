/**
 * Created by rviscuso on 11/29/16.
 */

const express = require('express');
const bodyParser = require('body-parser');
const du = require('./util/docker');

let serverPort = process.argv[2];
if(!serverPort){
    console.error('serverPort parameter missing');
    process.exit(1);
}

var app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {

    du.thisContainerInfo((err, out) => {
        res.json(out);
    })

})

app.post('ping', (req, res) => {
    let hostName = req.body.hostName || req.body.hostname || req.body.host
    du.pingS(hostName)
        .pipe(res);
})

app.post('http', (req, res) => {
    let url = req.body.url || req.body.URL || req.body.Url
    du.httpS(url)
        .pipe(res);
})

app.listen(serverPort, () => console.log('Server is listening at port ' + serverPort));