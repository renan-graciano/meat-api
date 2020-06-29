import 'jest'
import * as request from 'supertest'
import { environment } from '../common/environment'
import * as mongoose from 'mongoose';


let address: string = (<any>global).address

test('teste get /reviews', () => {
  return request(address)
    .get('/reviews')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)  
    })
  .catch(fail)
})

test('teste get /reviews/aaaa', () => {
  return request(address)
    .get('/reviews/aaa')
    .then(response => {
      expect(response.status).toBe(404) 
    })
  .catch(fail)
})

test('teste post /reviews', () => {
  let user = mongoose.Types.ObjectId
  let restaurant  = mongoose.Types.ObjectId
  return request(address)
    .post('/users')
    .send({
        name: 'teste review post User',
        email: 'testeReviewPostUser@email.com',
        password: 'testeReviewPostUser',
    })
    .then(response => {
      user = response.body._id
      request(address)
        .post('/restaurants')
        .send({
        name:'test Review post restaurant'
        })
        .then(response => {
          restaurant = response.body._id
          request(address)
          .post('/reviews')
        .send({
          date: new Date(),
          rating: 7,
          comments: "Very nice!",
          user: user,
          restaurant: restaurant
        }).then(response => {
          expect(response.status).toBe(200)
          expect(response.body._id).toBeDefined()
          expect(response.body.rating).toBe(7)
        })
        })
        
    })
   
  .catch(fail)
})