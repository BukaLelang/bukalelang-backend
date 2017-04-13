var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()

var should = chai.should()
chai.use(chaiHttp)

let serverHost = 'http://localhost:3000'

describe('Server is running test', () => {
    it('Should be return {status: "up"} when try to access /ping', (done) => {
        chai.request(serverHost).get('/ping').end((err, res) => {
            if (err) {
                done(err)
            } else {
                res.body.status.should.to.equal('up')
                done()
            }
        });
    })
})
