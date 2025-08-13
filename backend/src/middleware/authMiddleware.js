import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authenticate = async(req,res,next) => {
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader || !tokenHeader.startsWith("Bearer")){
        return res.status(401).json({message: "No token found"});
    }

    //Ex-> ["Bearer",token] after spliting.
    const token = tokenHeader.split(" ")[1];

    try {

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decode.id);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;

        next();
 
    } catch (error) {
        console.log("Error in authentication",error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}