import 'jest'
import * as request from 'supertest'
import { environment } from '../common/environment'
import * as mongoose from 'mongoose';
import {Menu} from './restaurants.model'

let address: string = (<any>global).address

test('teste get /restaurants', () => {
  return request(address)
    .get('/restaurants')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)  
    })
  .catch(fail)
})

test('teste get /restaurants/aaaa', () => {
  return request(address)
    .get('/restaurants/aaa')
    .then(response => {
      expect(response.status).toBe(404) 
    })
  .catch(fail)
})

test('test post /restaurants', () => {
  return request(address)
    .post('/restaurants')
    .send({
    name: "test post restaurants"
    }).then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()  
  })
})

test('teste post menu restaurant /restaurant/:id/menu', () => {
  return request(address)
    .post('/restaurants')
    .send({
    name:'test post menu restaurant'
    })
    .then(response => request(address)
      .put(`/restaurants/${response.body._id}/menu`)
      .send({
        name: 'test post menu restaurant 1',
        price: 12
      }))
    .then(response => {
      expect(response.status).toBe(200)
    })
})

test('teste get menu restaurant /restaurant/:id/menu', () => {
  let rest = mongoose.Types.ObjectId
  return request(address)
    .post('/restaurants')
    .send({
    name:'test get menu restaurant'
    })
    .then(response => {
      rest = response.body._id
      request(address)
      .put(`/restaurants/${rest}/menu`)
      .send({
        name: 'test get menu restaurant 1',
        price: 11
        })  
        .then(response => request(address)  
          .get(`/restaurants/${rest}/menu`)
      )
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)  
        })
    })  
})