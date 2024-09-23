import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();
export const signup = async(req,res,next) =>{
     const {email, password} = req.body;

      if(!email || !password){
            return next(errorHandler(404,"All fields are required"))
      }
      try {
            const existUser = await User.findOne({email});
            if(existUser) return next(errorHandler(401,"email already exists"));
            
            const newUser = new User({
                  email,
                  password
            })

            await newUser.save();

            const {password:_, ...rest} = newUser._doc;
            res.status(201).cookie('user', newUser, {
                  httpOnly: true
            }).json({message:"Signup Successful",user:rest});
            
      } catch (error) {
            next(error);
      }
}
export const login = async(req,res,next) =>{
     const {email, password} = req.body;

      if(!email || !password){
            return next(errorHandler(404,"All fields are required"))
      }
      try {
            const existUser = await User.findOne({email});
            if(!existUser) return next(errorHandler(401,"user not found"));
            if(!await bcrypt.compare(password, existUser.password)) return next(errorHandler(401,"wrong credentials"));

            const user = jwt.sign({id:existUser._id, email:existUser.email}, process.env.JWT_KEY);
            
            const {password:_, ...rest} = existUser._doc;
            res.cookie('user', user, {
                  httpOnly: true
            }).json({message:"Login Successful", user:rest});
            
      } catch (error) {
            next(error);
      }
}