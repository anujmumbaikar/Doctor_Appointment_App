import { asyncHandler } from "../utils/asycHandler.js";
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
export const verifyUser = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:'Unauthorized request'})
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken);
        
        const user = await User.findById(decodedToken?.id).select("-password")
        if(!user){
            return res.status(401).json({message:'Invalid access token'})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message:'Invalid access'})
    }
})