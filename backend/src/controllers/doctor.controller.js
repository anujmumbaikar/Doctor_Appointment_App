import { asyncHandler } from "../utils/asycHandler.js";
import { Doctor } from "../models/doctor.model.js";
import ApiResponse from "../utils/ApiResponse.js";
const changeAvailability = asyncHandler(async (req, res) => {
    const {docId} = req.body;
    const docData = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, {available: !docData.available});
    return res.status(200).json({success: true, message: "Availability changed successfully"});
})

const doctorList = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({}).select('-password -email');
    return res.status(200).json({success: true, doctors});
})

export { changeAvailability,doctorList }