import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

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
            res.status(201).cookie('user', newUser, {
                  httpOnly: true
            }).json({message:"Signup Successful",user:newUser});
            
      } catch (error) {
            next(error);
      }
}