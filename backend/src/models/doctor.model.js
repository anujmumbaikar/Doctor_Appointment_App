import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    speciality:{
        type: String,
        required: true
    },
    degree:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    available:{
        type: Boolean,
        default: true
    },
    fees:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    date:{
        type: Number,
        default: true,
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{timestamps: true,minimize: false});

// If you define a schema like this:
// const doctorSchema = new mongoose.Schema({
//     name: String,
//     slots_booked: Object
// });
// const Doctor = mongoose.model("Doctor", doctorSchema);

// const doc = new Doctor({ name: "Dr. Smith", slots_booked: {} });
// await doc.save();
// Result in MongoDB:
// {
//     "_id": "someObjectId",
//     "name": "Dr. Smith",
//     "__v": 0
// }
// 👉 slots_booked: {} was removed because it's an empty object.

//so my minize: false will keep the empty object in the database
doctorSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})
doctorSchema.methods.isPasswordCorrect =  async function(password){
    return await bcrypt.compare(password,this.password);
}
export const Doctor = mongoose.model('Doctor', doctorSchema);