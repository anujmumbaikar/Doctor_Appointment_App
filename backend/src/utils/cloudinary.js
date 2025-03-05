import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import {ApiError} from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        if(!upload){
            return new ApiError(200, 'Error occur while uploading image to cloudinary');
        }
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        console.log(error);  
        return null; 
    }
}