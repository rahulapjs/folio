// src/services/rag.ts
import { GoogleGenAI } from "@google/genai";
import { resumeData } from "../data/resume";

export interface RAGResponse {
    text: string;
}

export async function runRAG(apiKey: string, query: string): Promise<RAGResponse> {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are Rahul's portfolio AI assistant, speaking to a visitor. 
Always talk about Rahul in **third person**.
Never speak as Rahul.

Here is Rahul's COMPLETE DATA (use only this data, never invent new info):

${JSON.stringify(resumeData, null, 2)}

=======================  
INSTRUCTIONS  
=======================  
Your behavior rules:

1. GREETINGS  
   - If user says “hi”, “hello”, “hey”, greet warmly.  
   - Example: “Hello! How can I help you learn more about Rahul?”  

2. CATEGORY LOGIC  
   - If the question is about **projects**, answer ONLY using resumeData.projects.  
   - If the question is about **experience**, answer ONLY using resumeData.experience.  
   - If about **skills**, answer ONLY using resumeData.skills.  
   - If asking about **current job / where he works / now working**, return the item where year includes “Present”.  
   - If question matches multiple areas, choose the MOST relevant one.  
   - If unrelated or general, give a simple helpful answer describing Rahul.  
   - NEVER mix job experience with project lists.

3. ANSWER STYLE  
   - Always respond in third person (“Rahul is…”, “His experience includes…”).  
   - Keep answers clear, concise, friendly.  
   - Use bullet points when listing items.  
   - Never fabricate information.  

FORMAT RULES:
- Always answer in clean, natural paragraphs.
- Do NOT use bullet points, lists, tables, markdown sections, or nested formatting.
- Combine related skills into a concise paragraph (max 3 sentences).
- Keep the response readable and conversational, not technical documentation.

=======================  
USER QUESTION:  
${query}  
=======================  

Give the best possible answer using ONLY the provided resumeData.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.2,
            }
        });

        const text =
            response?.text ??
            response?.candidates?.[0]?.content?.parts?.[0]?.text ??
            "Sorry, I couldn't generate a response.";

        return { text };
    } catch (err) {
        console.error("Gemini API error:", err);
        sessionStorage.removeItem("geminiKey")
        return {
            text: "There was an error processing the request. Please check your API key.",
        };
    }
}
