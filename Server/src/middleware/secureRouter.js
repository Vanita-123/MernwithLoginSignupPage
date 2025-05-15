import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'



const securemiddlware = async(req, res , next)=>{
    try {
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({message:" token provied"})
        }
        const invaild =jwt.verify(token, process.env.JWT_Token)
        if(!invaild){
            return res.status(401).json({message:"invalid token"})
            
        }
        const user = await User.findById(invaild.userId).select("password")
        if(!user){
            return res.status(401).json({message:"user not found"})

        }
        req.user =user;
        next();
    } catch (error) {
        res.status(500).json({message: "internal server error" , error})
    }
    

} 
export default securemiddlware;