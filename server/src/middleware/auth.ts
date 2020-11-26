/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { UserModel } from '../models/User.model';

interface AuthRequest extends Request {
  user?: Document;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
  // Get the token from the header, if there is no token, sends forbidden status
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);
  const [, token] = authHeader.split(' ');

  try {
    const jwtCheck: any = jwt.verify(token, process.env.SECRET_KEY); // change this any type later!
    const user = await UserModel.findOne({ _id: jwtCheck._id });
    // If user does not exist in the database
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
    return null;
  // if user is not verified
  } catch (error) {
    res.sendStatus(403);
    return null;
  }
};

export default authMiddleware;
