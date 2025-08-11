import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API);

export const analyzeResume = async (jobDescription, resumeInfo) => {
    const model = genAi.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    const prompt = `
        📋 You are an expert HR recruiter 🤝 and career coach 🎯 specializing in resume evaluation for various job roles.  
        Your task is to analyze a candidate's resume 📄 against a given job description 📝.  

        ✅ Always respond in strict JSON format with the following keys only:  

        {
        "score": <numeric score between 0 and 100> 🔢,
        "grade": "<string: Excellent | Good | Average | Poor> 🏅",
        "suggestions": ["<list of specific, actionable improvements to align the resume with the job description> 💡"],
        "good_things": ["<list of notable strengths, unique qualities, or impressive aspects found in the resume> 🌟"]
        }

        📊 **Scoring Guidelines**:
        - 90-100: Excellent 🌟
        - 75-89: Good 👍
        - 60-74: Average 🙂
        - Below 60: Poor ❌

        📌 **Rules**:
        - 🚫 Do NOT include any text outside of the JSON structure.
        - 🎯 Be objective and concise.
        - 📌 Focus only on the match between resume and job description.
        - 🛠 If information is missing from the resume, include it in suggestions.
        - ❗ Never explain your reasoning outside the JSON — only include the four keys above.

        Resume: ${resumeInfo}

        Job Description: ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const match = rawText.match(/\{[\s\S]*\}/);
    const jsonResponse = match ? JSON.parse(match[0]) : {};

    return jsonResponse;
};
