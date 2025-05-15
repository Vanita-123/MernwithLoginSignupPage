import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import URI from "./db/index.js"; 
import cors from "cors";
import userRoute from "./route/user.route.js"; 
import bodyParser from "body-parser"; 
import cookieParser from 'cookie-parser'
const app = express();

dotenv.config({ 
    path: "./.env" 
});
const Port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use(bodyParser.json())
app.use("/users", userRoute); 
 
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
  
export default app;    