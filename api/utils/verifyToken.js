import jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token){
        return next(createError(401, "Not authenticated!"))
    }

    jwt.verify(token, process.env.jwt, (err, user)=> {
        if(err) 
            return next(createError(403, "Token not valid"))
        req.user = user;
        next()
    })   
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "Not Authorized!"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, () => {
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "Not Authorized! Not an Admin"))
        }
    })
}