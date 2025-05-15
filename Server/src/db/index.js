import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
});
const URI = process.env.MONGODB_URI;
const ConnectDb =async ()=>{

    try {
        await mongoose.connect(URI);
        console.log("MongoDb is connected")
        
    } catch (error) {
        console.log("Mongodb is not Connected" , error)
    }
}
ConnectDb(); 
export default URI