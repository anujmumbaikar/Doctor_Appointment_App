import {asyncHandler} from '../utils/asycHandler.js'
import validator from 'validator'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import {Doctor} from '../models/doctor.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
const addDoctor = asyncHandler(async(req,res)=>{
    const {name,email,password,speciality,degree,about,fees,address,experience} = req.body
    if(!name || !email || !password || !speciality || !degree || !about || !fees || !address || !experience){
        throw new ApiError(400,'Please fill all the fields')
    }
    //validate email
    if(!validator.isEmail(email)){
        throw new ApiError(400,'Please enter a valid email')

    }
    const exist = await Doctor.findOne({email})
    if(exist){
        throw new ApiError(400,'Doctor already exist')
    }
    //validate password
    if(password.length<7){
        throw new ApiError(400,'Password must be at least 7 characters long')
    }

    //cloudinary upload
    const imageFile = req.file?.path
    const imageResponse = await uploadOnCloudinary(imageFile)
    if(!imageResponse){
        throw new ApiError(500,'Error occur while uploading image to cloudinary')
    }
    const doctor = await Doctor.create({
        name,
        email,
        password,
        speciality,
        degree,
        about,
        fees,
        experience,
        address:JSON.parse(address),
        image:imageResponse.secure_url,
        date:Date.now()
    })
    const createdDoctor = await Doctor.findById(doctor._id).select('-password');
    if(!createdDoctor){
        throw new ApiError(500,'Doctor not created')
    }
    return res.status(200).json(new ApiResponse(200,{},"Doctor created successfully"))
})



export {addDoctor}