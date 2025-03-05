import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
const connectDb = async()=>{
    try {
        const connectedInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connected to ${connectedInstance.connection.name} database`);
    } catch (error) {
        throw new Error(error);
        console.log(error);
    }
}
export {connectDb}