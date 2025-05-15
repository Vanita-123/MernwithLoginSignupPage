import express from 'express'
import jwt from "jsonwebtoken"
const createtoken =(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_Token,{
        expiresIn: "30d",

    }
);
    res.cookie('jwt',token,{
     httpOnly:true,
     secure:true,
     sameSite :'strict',
      })
}
export default createtoken;