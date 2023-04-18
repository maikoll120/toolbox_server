import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app.js'

process.env.NODE_ENV = 'test'
const should = chai.should()
chai.use(chaiHttp)

describe('Testing - File endpoints:', () => {
  describe('/GET files/data', () => {
    it('it should GET a list of files with filename and lines', (done) => {
      chai.request(server)
        .get('/files/data')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body[0].should.have.property('file')
          res.body[0].should.have.property('lines')
          done()
        })
    })
  })

  describe('/GET files/data', () => {
    it('it should GET an empty array if the file doesnt exist', (done) => {
      chai.request(server)
        .get('/files/data?fileName=filenotfound.csv')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.have.lengthOf(0)
          done()
        })
    })
  })

  describe('/GET files/list', () => {
    it('it should GET an object with a list of files', (done) => {
      chai.request(server)
        .get('/files/list')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('files')
          res.body.files.should.be.a('array')
          done()
        })
    })
  })
})
