import {Router} from "express";
import { getAnalysis, careerGuide, interviewGuide } from "../controllers/aiController.js";
import multer from "multer";

const aiRouter = Router();

//Storing file as buffer object:
const upload = multer({storage:multer.memoryStorage()})

aiRouter.get("/hello",(req,res) => {
    res.status(200).json({message:"Hello from AI Route"})
});

aiRouter.post('/analyze',upload.single("resume"),getAnalysis);

aiRouter.post('/career-guide',careerGuide);

aiRouter.post('/interview-guide',interviewGuide);

export default aiRouter;