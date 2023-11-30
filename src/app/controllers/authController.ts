import { Request, Response } from 'express';
import * as  authSevice from '../services/authService';
import { IJwtUser } from '../types';

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, phone_number, password } = req.body;
    const result = await authSevice.signup({ name, email, phone_number, password });
    res.status(201).send({ message: 'User created successfully', data: result });
  } catch (err :any) {
    res.status(400).send({error:err.message, data: {} });
  }
}


export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authSevice.login({ email, password });
    res.status(200).send({ message: 'Login successful', data: result });
  } catch (err:any) {
    res.status(400).send({error:err.message, data: {} });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const user = req.user as IJwtUser;
    const token = req.token as string;
    await authSevice.logout({ user, token });
    res.status(200).send({ message: 'You have successfully logged out' });
  } catch (err:any) {
    res.status(400).send({error:err.message, data: {} });
  }
}