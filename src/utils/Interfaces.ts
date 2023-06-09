import { IUser } from "../models/userModel";
import { Request } from "express";
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }

export interface loginRequest {
  email:string;
  password:string
}
export interface decodedToken {
  id: string;
  iat: number;
  exp: number;
}
export interface Obj {
  [key: string]: string;
}
export interface userRequest extends Request {
  user?: IUser;
}