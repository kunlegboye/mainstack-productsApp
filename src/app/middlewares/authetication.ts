import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IJwtUser } from '../types';
import redisClient from '../config/redis';

const accessSecret: string = process.env.JWT_ACCESS_SECRET as string;

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, accessSecret);
    if (!decoded) return res.status(401).send({ error: 'Error verifying token' });
    const user = decoded as IJwtUser;
    req.user = user;
    req.token = token;

    const blacklistedToken = await redisClient.get('BL_' + user.email);
    if(blacklistedToken && blacklistedToken === token){
    return res.status(401).send({ error: 'Invalid Token' });
    }

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unable To Authenticate User.', data: err });
  }
};