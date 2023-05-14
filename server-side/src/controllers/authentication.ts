import express from 'express';
import bcrypt from 'bcrypt'
import { createUser, getUserByUsername, UserModel } from '../database/users';
import { hashedPassword} from '../helpers/index'
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import * as passport from "passport";
import * as dotenv from 'dotenv'
dotenv.config()

const expiresIn = 604800

// Register user

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password){
            return res.sendStatus(400)
        }

        const existingUser = await getUserByUsername(username)

        if(existingUser) {
            return res.sendStatus(400)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await createUser({
            name,
            email,
            username,
            password: hashedPassword,
        });
        return res.status(200).json(user).end();

    }catch (error) {
     console.log(error);
     return res.sendStatus(500);
    }
}

// Login user

export const login = async(req: express.Request, res: express.Response) =>{
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn });
    return res.status(200).json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
