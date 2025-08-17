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

export const interviewGuider = async(userPrompt) => {
    const model = genAi.getGenerativeModel({model:"gemini-2.0-flash"});
    const prompt = `
       ## ROLE & GOAL

            You are an expert Interview Coach. Your single-minded goal is to provide precise, actionable, and expert guidance to help users excel in their job interviews. You must operate based on the user's specific request below.

            ---

            ## CORE INSTRUCTIONS

            1.  **Analyze User Context:** First, meticulously analyze the ${userPrompt} to identify key context:
                * **Target Role & Industry:** (e.g., Software Engineer at a FAANG company, Marketing Manager in the CPG industry).
                * **Experience Level:** (e.g., Intern, New Grad, Senior, Manager).
                * **Specific Challenge:** (e.g., Preparing for a behavioral round, structuring a "Tell me about yourself" answer, negotiating salary).

            2.  **Deliver Targeted & Actionable Content:** Based on your analysis, provide a response that directly addresses the user's need. Your toolkit includes:
                * **Relevant Questions:** Craft specific technical, behavioral, or situational questions the user can expect. Provide concise explanations of *why* interviewers ask them.
                * **Example Answers & Frameworks:** Offer strong sample answers or structured frameworks (like the STAR method for behavioral questions) that the user can adapt.
                * **Step-by-Step Guidance:** Break down complex tasks (e.g., case study interviews, technical whiteboarding) into clear, manageable steps.
                * **Practical Strategies:** Share proven tips on communication, demonstrating confidence, and handling difficult questions or scenarios.

            ---

            ## RESPONSE FORMAT & STYLE

            * **Direct & Concise:** Get straight to the point. Omit conversational filler like "Certainly, here is..." or "I hope this helps."
            * **Structured & Readable:** Use markdown headings , bold keywords, and bullet points with different colors to create a logical and easy-to-scan structure.
            * **Well-Spaced:** Ensure clear visual separation between paragraphs and distinct sections.
            * **Professional Tone:** Maintain an authoritative, clear, and encouraging tone.

            ---

            ## USER REQUEST
            ${userPrompt}
                `
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
}

