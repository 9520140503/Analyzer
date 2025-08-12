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

export const careerGuider = async(jobRole) => {
    const model = genAi.getGenerativeModel({model:"gemini-2.0-flash"});
    
    const prompt = `
        You are an expert career coach and roadmap planner with deep knowledge of modern tech industry requirements. 
        Your task is to generate a step-by-step career roadmap in JSON format based on the user’s desired job role. 

        The roadmap must:
        - Be broken into sequential phases that progress from beginner to advanced.
        - Clearly state duration for each phase in months.
        - Include technical skills, soft skills, and project-building milestones.
        - Suggest relevant free or high-quality learning resources.
        - Add a creative "emojiTag" for each phase to make it visually engaging in UI.
        - Be concise but complete — each phase should be actionable.

        IMPORTANT:
        - Output ONLY valid JSON.
        - Do not add explanations, markdown, or extra text outside the JSON.
        - Ensure JSON is clean and machine-readable (no trailing commas).

        Output format:
        {
        "jobRole": "${jobRole}",
        "totalDuration": "<total duration in months>",
        "phases": [
            {
            "phase": "Phase 1: <Title>",
            "duration": "X months",
            "skills": ["Skill 1", "Skill 2", "Skill 3"],
            "milestones": ["Milestone 1", "Milestone 2"],
            "resources": [
                {"name": "Resource Name", "type": "course/video/article", "link": "https://..."}
            ],
            "emojiTag": "🚀"
            },
            {
            "phase": "Phase 2: <Title>",
            "duration": "X months",
            "skills": ["Skill 1", "Skill 2"],
            "milestones": ["Milestone 1"],
            "resources": [
                {"name": "Resource Name", "type": "course", "link": "https://..."}
            ],
            "emojiTag": "💻"
            }
        ]
        }

        Example for emojiTag usage:
        📚 for learning basics, 💻 for coding practice, 🚀 for final projects, 🎯 for job preparation.

        Guidelines:
        1. Ensure skills are relevant and up-to-date for the role.
        2. Milestones should be measurable (e.g., “Build and deploy 3 small apps”).
        3. Prefer free resources when possible.
        4. Use consistent formatting for all phases.
    `
    const response = await model.generateContent(prompt);

    const text = response.response.text();

    const match = text.match(/\{[\s\S]*\}/);

    if(!match) throw new Error("No valid JSON found in Gemini response.");
    
    const jsonResult = JSON.parse(match[0]);
    return jsonResult;
}

