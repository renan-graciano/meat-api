import * as mongoose from 'mongoose'

export interface IMenuItem extends mongoose.Document{
  name: string,
  price: number
}

export interface IRestaurant extends mongoose.Document{
  name: string,
  menu: IMenuItem[]
}

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const restSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  menu: {
    type: [menuSchema],
    required: false,
    select: false,
    default: []
  }
})

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restSchema)
export const Menu = mongoose.model<IMenuItem>('Menu', menuSchema)