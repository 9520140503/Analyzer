import { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post('/signup',signup);

userRouter.post('/login',login);

userRouter.put('/update-profile',authenticate,updateProfile);

userRouter.get('/logout',authenticate,logout);


export default userRouter;