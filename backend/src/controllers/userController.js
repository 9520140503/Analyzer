import jwt from "jsonwebtoken";
import {z} from "zod";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const zodSchema = z.object({
    fullname:z.string(),
    email:z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6,{ message: "Password must be at least 6 characters"})
})

export const signup = async(req,res) => {
    const {fullname, email, password} = req.body;
    const validate = zodSchema.safeParse(req.body);

    if(!validate.success){
        return res.status(400).json({
            message: "Please fill valid credentials",
            error:validate.error.flatten().fieldErrors
        });
    }

    try {
        const userExists = await User.findOne({email});
        if(userExists){
             return res.status(400).json({message:"User all ready exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        
        await User.create({
            fullname,email,password:hashPassword
        })

        return res.status(200).json({message:"User signed up successfully"});
        
    } catch (error) {
        console.log("Signup Error ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

};

export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User doesn't exists"})
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(400).json({message:"Password doesn't match"})
        }

        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:"4h"
        })

        return res.status(200).json({message:"User logged-in succesfully",token})
        
    } catch (error) {
        console.log("Login Error ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const updateProfile = async(req,res) => {
    const user = req.user;
    const {image, fullname,email,password} = req.body;
    try {
        const updateData = {fullname,email};

        if(password && password.trim() !== ''){
            const hashPassword = await bcrypt.hash(password,10);
            updateData.password = hashPassword;
        }

        await User.findByIdAndUpdate(user._id,updateData);

         res.json("User Info has Been Updated");

    } catch (error) {
        console.log("UpdateProfile Error ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const profile = async(req,res) => {
    const user = req.user;
    const {image,fullname,email,mobile} = user;
    res.json({
        image,fullname,email,mobile
    })
}

export const logout = async(req,res) => {
    try {
        res.status(200).json({message: "Logout Successfully"});
    } catch (error) {
        console.log("Logout Error ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}