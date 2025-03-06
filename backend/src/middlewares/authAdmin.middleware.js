import { asyncHandler } from "../utils/asycHandler.js";
import jwt from 'jsonwebtoken'
export const verifyAdmin  = asyncHandler(async(req,res,next)=>{
    const admintoken = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!admintoken){
        return res.status(401).json({message:'Unauthorized request'})
    }
    const decodedToken = jwt.verify(admintoken,process.env.ACCESS_TOKEN_SECRET)
    if(decodedToken.email !== process.env.ADMIN_EMAIL){
        return res.status(401).json({message:'Unauthorized request'})
    }
    next()
})