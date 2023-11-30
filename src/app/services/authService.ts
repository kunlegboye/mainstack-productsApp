import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import redisClient from '../config/redis';
import { IJwtUser, signupUser } from '../types';


const accessSecret: string = process.env.JWT_ACCESS_SECRET as string;

export async function signup({ name, email, phone_number, password }: any) {
  const existingUser = await User.findOne({ $or: [{ email }, { phone_number }] });

  if (existingUser) {
    throw new Error('Email or Phone Number already exists.');
  }

  const user = new User({ name, email, phone_number, password });
  return user.save();
}

export async function login({ email, password }: any) {
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error('User with email not found');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error('Invalid credentials');
  }

  //delete user?.password;

  const accessToken = await generateToken(email, user.phone_number);

  return { user, accessToken };
}

async function generateToken(email: string, phone: string) {
  try{
    let token = await redisClient.get(email);
  if (!token) {
    token = await signToken(email, phone);
  }

  const decoded = jwt.verify(token, accessSecret);

  if (!decoded) {
    token = await signToken(email, phone);
  }

  return token;
}catch(err:any){
if (err.message === 'jwt expired'){
const token = await redisClient.get(email);
return token;
}
}
}

async function signToken(email: string, phone: string) {
  const token = jwt.sign({ email, phone }, accessSecret, { expiresIn: process.env.JWT_ACCESS_TIME });
  await redisClient.set(email, token);
  return token;
}

export async function logout({ user, token }: { user: IJwtUser, token: string }) {
  await redisClient.del(user.email);
  await redisClient.set('BL_' + user.email, token);
}

 export async function getUserByEmail(email: string){
    return await User.findOne({ email }); 
}