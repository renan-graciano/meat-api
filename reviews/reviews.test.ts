import 'jest'
import * as request from 'supertest'
import { environment } from '../common/environment'
import * as mongoose from 'mongoose';


const address: string = (<any>global).address
const auth: string = (<any>global).auth

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
  let userid: mongoose.Types.ObjectId
  let restaurantid: mongoose.Types.ObjectId
  return request(address)
    .post('/users')
    .set('Authorization', auth)
    .send({
      name: 'teste review post User',
      email: 'testeReviewPostUser@email.com',
      password: 'testeReviewPostUser',
    })
    .then(response => {
      userid = response.body._id
      request(address)
        .post('/restaurants')
        .set('Authorization', auth)
        .send({
          name: 'test Review post restaurant'
        })
        .then(response => {
          restaurantid = response.body._id
          request(address)
            .post('/reviews')
            .send({
              date: "2020-06-27T17:59:12",
              rating: 7,
              comments: "Very nice!",
              user: userid,
              restaurant: restaurantid
            }).then(response => {
              expect(response.status).toBe(200)
              expect(response.body._id).toBeDefined()
              expect(response.body.rating).toBe(7)
            })
        })
        
    })
    .catch(fail)
})