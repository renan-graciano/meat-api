import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environment'
import { response } from 'spdy';

const address: string = (<any>global).address
const auth: string = (<any>global).auth

test('teste get /users', () => {
  return request(address)
    .get('/users')
    .set('Authorization', auth)
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)  
  }).catch(fail)
})

test('teste post /users', () => {
  return request(address)
    .post('/users')
    .set('Authorization', auth)
    .send({
      name: 'Roberto',
      email: 'roberto@email.com',
      password: '123456',
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
    .set('Authorization', auth)
    .then(response => {
      expect(response.status).toBe(404)
  }).catch(fail)
})

test('teste patch /users/:id', () => {
  return request(address)
    .post('/users')
    .set('Authorization', auth)
    .send({
      name: 'Mario',
      email: 'mario@email.com',
      password: '123455',
    })
    .then(response => request(address)
      .patch(`/users/${response.body._id}`)
      .set('Authorization', auth)
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

test('teste autenticacao /users/authenticate', () => {
  return request(address)
    .post('/users/authenticate')
    .send({
      email: 'roberto@email.com',
      password: "123456"    
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.accessToken).toBeDefined()
    expect(response.body.email).toBe('roberto@email.com')  
  })
})

test('teste autenticacao errada /users/authenticate', () => {
  return request(address)
    .post('/users/authenticate')
    .send({
      email: 'bruce@dc.com',
      password: "batmant"    
    })
    .then(response => {
      expect(response.status).toBe(403)
      expect(response.body.message).toBeDefined()
    expect(response.body.message).toBe('Invalid credentials')  
  })
})