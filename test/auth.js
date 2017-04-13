var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()

var should = chai.should()
chai.use(chaiHttp)

let serverHost = 'http://localhost:3000'

describe('Auth Test', () => {
    it('Should be return status Success when trying to login', (done) => {
        chai.request(serverHost).post('/auth/login').send({
          username: 'dikytesting',
          password: 'bukabukaan'
        }).end((err, res) => {
            if (err) {
                done(err)
            } else {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.to.equal(true)
                done()
            }
        });
    })
})
