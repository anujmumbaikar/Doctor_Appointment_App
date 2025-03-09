import {asyncHandler} from '../utils/asycHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import validator from 'validator'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {Doctor} from '../models/doctor.model.js'
import {Appointment} from '../models/appointment.model.js'
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
const getUserProfileData = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password")
    if(!user){
        throw new ApiError(400,"User not found")
    }
    return res.status(200).json(new ApiResponse(200,user,"User profile data"))
})
const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, phone, address, dob, gender } = req.body;
    if (!name || !phone || !dob || !gender) {
        throw new ApiError(400, "Please fill all fields");
    }
    if (!req.file) {
        throw new ApiError(400, 'No image file uploaded');
    }
    const imageFilePath = req.file.path;
    const imageResponse = await uploadOnCloudinary(imageFilePath);
    
    if (!imageResponse) {
        throw new ApiError(500, 'Image not uploaded');
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                image: imageResponse.secure_url, // Use Cloudinary URL
                name,
                phone,
                address: JSON.parse(address),
                dob,
                gender,
            }
        },
        { new: true }
    );
    if (!user) {
        throw new ApiError(404, "User not found");
    } 
    return res.status(200).json(new ApiResponse(200, user, "User profile updated successfully"));
});
const bookAppointment = asyncHandler(async(req,res)=>{
    const {docId,slotDate,slotTime} = req.body
    const docData = await Doctor.findById(docId).select("-password")
    if(!docData.available){
        return res.status(400).json(new ApiResponse(400,{},"Doctor is not available"))
    }
    let slots_booked = docData.slots_booked
    //checking for slot availability
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.status(400).json(new ApiResponse(400,{},"Slot not available"))
        }else{
            slots_booked[slotDate].push(slotTime)
        }
    }else{
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }
    const userData = await User.findById(req.user._id).select("-password")
    delete docData.slots_booked
    const appointment = await Appointment.create({
        docId,
        userId:req.user._id,
        docData,
        userData,
        slotDate,
        amount:docData.fees,
        slotTime,
        date:Date.now()
    })
    if(!appointment){
        return res.status(400).json(new ApiResponse(400,{},"Appointment not booked"))
    }

    //save new slots data in docData
    await Doctor.findByIdAndUpdate(
        docId,
        {
            $set:{
                slots_booked
            }
        },
        {new:true}
    )
    return res.status(200).json(new ApiResponse(200,appointment,"Appointment booked successfully"))

})
const getMyAppointments = asyncHandler(async(req,res)=>{
    const appointments = await Appointment.find({userId:req.user._id})
    if(!appointments){
        return res.status(400).json(new ApiResponse(400,{},"No appointments found"))
    }
    return res.status(200).json(new ApiResponse(200,appointments,"Appointments found"))
})
const cancelAppointment = asyncHandler(async(req,res)=>{
    const {appointmentId} = req.body
    const appointmentData = await Appointment.findById(appointmentId)
    if(appointmentData.userId != req.user._id){
        return res.status(400).json(new ApiResponse(400,{},"You are not authorized to cancel this appointment"))
    }
    await Appointment.findByIdAndUpdate(
        appointmentId,
        {
            $set:{
                cancelled:true
            }
        },
        {new:true}
    )
    //releasing doctor slot
    const {docId,slotDate,slotTime} = appointmentData
    const docData = await Doctor.findById(docId)
    let slots_booked = docData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(slot=>slot!=slotTime)
    await Doctor.findByIdAndUpdate(
        docId,
        {
            $set:{
                slots_booked
            }
        },
        {new:true}
    )
    return res.status(200).json(new ApiResponse(200,{},"Appointment cancelled successfully"))
})

export {registerUser,login,logout,getUserProfileData,updateUserProfile,bookAppointment,getMyAppointments,cancelAppointment}