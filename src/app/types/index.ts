
declare module 'express' {
  interface Request {
    user?: IJwtUser;
    token?: string;
  }
}

export interface IJwtUser {
  email: string;
  phone: string;
  iat: number;
  exp: number;
}

export interface signupUser {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
}