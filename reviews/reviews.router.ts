import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import { Review, IReview } from '../reviews/reviews.model'
import * as mongoose from 'mongoose'

class ReviewsRouter extends ModelRouter<IReview>{
  constructor() {
    super(Review)
  }

  protected prepareOne(query: mongoose.DocumentQuery<IReview, IReview>): mongoose.DocumentQuery<IReview, IReview>{
    return query.populate('user', 'name')
      .populate('restaurant', 'name')
  } 
  protected prepareAll(query: mongoose.DocumentQuery<IReview[], IReview>): mongoose.DocumentQuery<IReview[], IReview>{
    return query.populate('user', 'name')
    .populate('restaurant', 'name')
  }
  envelope(document) {
    let resource = super.envelope(document)
    const restID = document.restaurant._id ? document.restaurant._id : document.restaurant
    resource._links.restaurant = `/restaurants/${restID}`
    return resource
  }
  /* findById = (req,resp,next) => {
    this.model.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name')  
      .then(this.render(resp, next))
      .catch(next)
  } */

  applyRoutes(application: restify.Server) {
    application.get(`${this.basePath}`, this.findAll)
    application.get(`${this.basePath}/:id`, [this.validateId,this.findById])
    application.post(`${this.basePath}`,this.save)
  }
}

export const reviewsRouter = new ReviewsRouter()