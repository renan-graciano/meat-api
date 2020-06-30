import { User, IUser } from "./users/users.model";


declare module 'restify' {
  export interface Request{
    authenticated: IUser
  }
}