import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environment'

let address: string = (<any>global).address

test('teste get /users', () => {
  return request(address)
    .get('/users')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)  
  }).catch(fail)
})
test('teste post /users', () => {
  return request(address)
    .post('/users')
    .send({
      name: 'Roberto',
      email: 'roberto@email.com',
      password: '123455',
      cpf: '581.230.550-13'
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('Roberto')
      expect(response.body.email).toBe('roberto@email.com')
      expect(response.body.cpf).toBe('581.230.550-13')
      expect(response.body.password).toBeUndefined()
  }).catch(fail)
})

test('get /users/aaa - not found', () => {
  return request(address)
    .get('/users/aaa')
    .then(response => {
      expect(response.status).toBe(404)
  }).catch(fail)
})

test('teste patch /users/:id', () => {
  return request(address)
    .post('/users')
    .send({
      name: 'Mario',
      email: 'mario@email.com',
      password: '123455',
    })
    .then(response => request(address)
      .patch(`/users/${response.body._id}`)
      .send({
      name:'Ricardo Mario'
    }))
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe('Ricardo Mario')
      expect(response.body.email).toBe('mario@email.com')
      expect(response.body.password).toBeUndefined()
    })
    .catch(fail)
})