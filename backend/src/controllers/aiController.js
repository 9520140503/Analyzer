import {createRequire} from "module";
import mammoth from "mammoth";
import {analyzeResume, careerGuider, interviewGuider} from "../services/ai.service.js"

//use of commonJs so that deubugMode is never triggered.
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const getAnalysis = async(req,res) => {
    const jobDescription = req.body.description;
    
    try {
        if(!req.file){
            return res.status(400).send("No file uploaded");
        }
        
        let resumeInfo = "";
        const resumeBuffer = req.file.buffer;
        
        if(req.file.mimetype.toLowerCase() === "application/pdf"){
            const data = await pdf(resumeBuffer);
            resumeInfo = data.text;
        }
        else if(req.file.mimetype.toLowerCase() === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            const data = await mammoth.extractRawText({buffer: resumeBuffer});
            resumeInfo = data.value;
        }
        else{
            return res.status(400).send("Only PDF and DOCX files are supported");
        }

        if (!resumeInfo) {
            return res.status(400).send("Unable to extract text from the uploaded file.");
        }

        const response = await analyzeResume(jobDescription, resumeInfo);

        return res.status(200).json({response})


    } catch (error) {
        console.error("Error in getAnalysis", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const careerGuide = async(req,res) => {
    const jobRole = req.body.jobRole;
    try {
        const response = await careerGuider(jobRole);
        res.status(200).json({response});
    } catch (error) {
        console.error("Error in careerGuide", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const interviewGuide = async(req,res) => {
    const userPrompt = req.body.prompt;
    try {
        const response = await interviewGuider(userPrompt);
        res.status(200).json({response});
    } catch (error) {
        console.error("Error in interviewGuide", error);
         res.status(500).json({ error: "Server error" });
    }
};