import {app} from "./app.js";
import dotenv from "dotenv";
import {connectDb} from "./db/index.js";
dotenv.config({
    path:'../.env'
})


connectDb()
.then(()=>{
    app.listen(process.env.PORT || 3000 ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Error connecting to the database::");
    console.log(err);
})
