import {asyncHandler} from '../utils/asycHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import validator from 'validator'
import {User} from '../models/user.model.js'
const generateAccessToken = async(userID)=>{
    const user = await User.findById(userID)
    if(!user){
        throw new ApiError(400,"something went wrong")
    }
    const accessToken = user.generateToken();
    await user.save({validateBeforeSave:false}) //why we do this??
    // we do this because we dont want to validate the password and other fields again
    // we just want to update the refresh token
    return {accessToken}

}

const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        throw new ApiError(400,'Please fill all fields')
    }
    if(!validator.isEmail(email)){
        throw new ApiError(400,'Invalid email')
    }
    if(password.length < 6){
        throw new ApiError(400,'Password must be at least 6 characters')
    }
    // Register user
    const exist = await User.findOne({email})
    const user = await User.create({name,email,password})
    if(!user){
        throw new ApiError(500,'User not created')
    }
    const createdUser = await User.findById(user._id).select('-password')
    if(!createdUser){
        throw new ApiError(500,'User not created')
    }
    return res.status(200).json(new ApiResponse(200,createdUser,'User created successfully'))

})
const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        throw new ApiError(400,"Pls enter email")
    }
    if(!password){
        throw new ApiError(400,"Pls enter password")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"User Not Found!!")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400,"password is incorrect")
    }
    const {accessToken} = await generateAccessToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password")
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res.status(200).cookie('accessToken',accessToken,options)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken},"User logged in successfully"))
})

const logout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                accessToken:""
            }
        },
        {new:true}
    )
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res.status(200).clearCookie('accessToken',options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})
export {registerUser,login,logout}