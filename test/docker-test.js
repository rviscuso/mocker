/**
 * Created by rviscuso on 11/29/16.
 */

const du = require('../src/util/docker');

describe('docker', function() {

    this.timeout(5000);

    it('should ping localhost', (done) => {

        let st = du.pingS('localhost');

        st.on('data', (data) => {
            //console.log(data.toString());
        });

        st.on('error', (err) => {
            done(err);
        });

        st.on('end', () => {
            done();
        })

    });

    it('should http request google', (done) => {

        let st = du.httpS('http://google.com');

        st.on('response', () => {
            done();
        });

        st.on('error', (err) => {
            done(err);
        })
    });

    it('NEGATIVE should return error for non-exisitng url', (done) => {

        let st = du.httpS('http://abcdefghijk.com');

        st.on('response', () => {
            done('Received response but shouldn\'t have')
        });

        st.on('error', () => {
            done();
        })
    });

    it('NEGATIVE 404', (done) => {

        let st = du.httpS('http://google.com/idontexist');

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

    })
});