/**
 * Created by rviscuso on 11/29/16.
 */

const du = require('../src/util/docker')

describe('docker', function() {

    this.timeout(5000);

    it('should ping', (done) => {

        let st = du.pingS('localhost');

        st.on('data', (data) => {
            console.log(data.toString());
        })

        st.on('end', () => {
            done();
        })

    }),

    it('should http request', (done) => {

        let st = du.httpS('http://my.oracle.com');

        st.on('data', (data) => {
            console.log(data.toString());
        })

        st.on('end', () => {
            done();
        })
    })

    it('NEGATIVE should http request', (done) => {

        let st = du.httpS('http://idontexist.com');

        st.on('data', (data) => {
            console.log(data.toString());
        })

        st.on('error', (err) => {
            done(err);
        })

        st.on('end', () => {
            done();
        })
    })

    it('NEGATIVE 404', (done) => {

        let st = du.httpS('http://my.oracle.com/idontexist');

        st.on('response', (res) => {
            if (res.statusCode == 404){
                done();
            }
            else {
                done('not 404: ' + res.statusCode);
            }
        })


    })


})