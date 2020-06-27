import * as mongoose from 'mongoose'
import { IRestaurant } from '../restaurants/restaurants.model';
import { IUser } from '../users/users.model';

export interface IReview extends mongoose.Document{
  date: Date,
  rating: number,
  restaurant: mongoose.Types.ObjectId | IRestaurant,
  user: mongoose.Types.ObjectId | IUser
}

const reviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true,
    maxlength: 500
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Restaurant',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  }
})

export const Review = mongoose.model<IReview>('Review',reviewSchema)