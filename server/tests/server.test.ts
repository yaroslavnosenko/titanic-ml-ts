import app from '../app'
const supertest = require('supertest')
const request = supertest(app)

const testData = {
  Pclass: 3,
  Sex: 'male',
  SibSp: 1,
  Parch: 0,
  Fare: 7.25,
  Embarked: 'S',
}

describe('Server tests', () => {
  it('server is working', done => {
    request.get('/').expect(200, done)
  })

  it('predict is working with TRAINED model', async done => {
    let response = await request.get('/reset')
    expect(response.status).toBe(200)

    response = await request.get('/learn')
    expect(response.status).toBe(200)
    expect(response.body.accuracy).toBeTruthy()

    response = await request.post('/predict').set('Content-type', 'application/json').send(testData)
    expect(response.status).toBe(200)
    expect(response.body.survived).toBeDefined()

    response = await request.get('/reset')
    expect(response.status).toBe(200)
    done()
  })

  it('predict is NOT working with EMPTY model', async done => {
    let response = await request.get('/reset')
    expect(response.status).toBe(200)

    response = await request.post('/predict').set('Content-type', 'application/json').send(testData)

    expect(response.status).toBe(404)
    done()
  })
})
