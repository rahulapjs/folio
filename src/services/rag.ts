// src/services/rag.ts

import { GoogleGenAI } from '@google/genai';
import { KNOWLEDGE_BASE } from '../data/kb'; 

// --- TYPE DEFINITIONS ---
interface RAGResponse {
    text: string;
}

interface KnowledgeChunk {
    id: string;
    title: string;
    text: string;
}


// --- 1. INDEXING (Mock Retrieval for Simplicity) ---
const retrieveRelevantContext = (query: string): KnowledgeChunk[] => {
    const lowerQuery = query.toLowerCase();
    const matches: KnowledgeChunk[] = [];
    
    KNOWLEDGE_BASE.forEach(chunk => {
        if (chunk.text.toLowerCase().includes(lowerQuery) || 
            chunk.title.toLowerCase().includes(lowerQuery) ||
            query.toLowerCase().split(' ').some(word => word.length > 3 && chunk.text.toLowerCase().includes(word))
        ) {
            if (!matches.some(m => m.id === chunk.id)) {
                 matches.push(chunk as KnowledgeChunk);
            }
        }
    });

    const hero = KNOWLEDGE_BASE.find(c => c.id === 'hero');
    const skills = KNOWLEDGE_BASE.find(c => c.id === 'skills');
    
    if (hero && !matches.some(m => m.id === 'hero')) matches.push(hero as KnowledgeChunk);
    if (skills && !matches.some(m => m.id === 'skills')) matches.push(skills as KnowledgeChunk);

    return matches.slice(0, 5); 
};


// --- 2. GENERATION (Augmented with Retrieved Context) ---
export async function runRAG(apiKey: string, query: string): Promise<RAGResponse> {
    
    // Step 1: Retrieval
    const retrievedChunks = retrieveRelevantContext(query);

    if (retrievedChunks.length === 0) {
        return { 
            text: "I couldn't find any relevant information in Rahul's resume to answer that question. Could you try asking about his skills, experience, or projects?" 
        };
    }
    
    const context = retrievedChunks
        .map(chunk => `## ${chunk.title}\n${chunk.text}`)
        .join('\n\n---\n\n');

    // Step 2: Generation (Prompt Construction)
    const prompt = `You are a helpful AI assistant for a professional resume. 
    Your name is Rahul's AI Assistant.
    Your task is to answer the user's question ONLY based on the provided CONTEXT. 
    Do not use any external knowledge. 
    If the context does not contain the answer, politely state that the information is not in the resume. 
    Be concise, professional, and friendly.

    CONTEXT:
    ---
    ${context}
    ---

    USER QUESTION: "${query}"

    ANSWER:`;
    const ai = new GoogleGenAI({ apiKey });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.2, 
            }
        });

        const text = response.text || "Sorry, the AI was unable to generate a response.";
        
        return { text };
    } catch (error) {
        console.error("Gemini API call failed during RAG generation:", error);
        throw new Error("API call failed. Please check the provided API key.");
    }
}