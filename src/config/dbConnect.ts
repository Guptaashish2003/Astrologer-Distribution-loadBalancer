import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });
const connectDatabase = () => {
    console.log(process.env.MONGODB_URL)
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error("MONGODB_URL is not defined in the environment variables");
    }
    mongoose.connect(mongoUrl, {
    
    }).then(()=>{
        console.log("Database connected")
    }).catch((error:Error)=>{
        console.log("databse connection failed....",error)
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log(`Database connected `);
    });
}


export default connectDatabase
