/**
 * Created by rviscuso on 11/29/16.
 */

const util = require('../src/util');

describe('util', function() {

    this.timeout(5000);

    it('should ping localhost', (done) => {

        let st = util.pingS('localhost');

        st.on('error', (err) => {
            done(err);
        });

        st.on('end', () => {
            done();
        })
    });

    it('should http request google', (done) => {

        let st = util.httpS('http://google.com');

        st.on('response', () => {
            done();
        });

        st.on('error', (err) => {
            done(err);
        })
    });

    it('NEGATIVE should return error for non-exisitng url', (done) => {

        let st = util.httpS('http://abcdefghijk.com');

        st.on('response', () => {
            done('Received response but shouldn\'t have')
        });

        st.on('error', () => {
            done();
        })
    });

    it('NEGATIVE 404', (done) => {

        let st = util.httpS('http://google.com/idontexist');

        st.on('response', (res) => {
            if (res.statusCode == 404){
                done();
            }
            else {
                done('not 404: ' + res.statusCode);
            }
        });

        st.on('error', (err) => {
            done(err);
        })

    });

    it ('should telnet', (done) => {

        util.telnet('www.google.com', 80, (err) => {
            if(err){
                done(err);
            }
            else {
                done();
            }
        })
    });

    it ('NEGATIVE should telnet', (done) => {

        util.telnet('http://abcdefghijk.com', 80, (err, data) => {
            if(err){
                done();
            }
            else {
                done('Connected but should not have: ' + data);
            }
        })
    })
});