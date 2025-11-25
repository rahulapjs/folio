import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import './FloatingChat.scss';

// Assuming these imports are correct based on the original code
import { runRAG } from '../../services/rag';
// NOTE: GoogleGenAI is no longer needed in the component as runRAG handles the call.
// import { GoogleGenAI } from '@google/genai'; 

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

// NOTE: The separate verifyApiKey function is no longer needed 
// as validation is done by attempting to run the RAG query.

const FloatingChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("geminiKey") || "");
    const [awaitingApiKey, setAwaitingApiKey] = useState(false);
    
    // RE-INTRODUCED: State to store the user's question while they enter the API key
    const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Rahul's AI assistant. Ask me anything about his skills, projects, or experience.",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);

    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // --- HELPER FUNCTION: RAG Query Execution ---
    // This logic is factored out to be reusable for both normal chat and post-key validation.
    const runRagQuery = async (key: string, question: string) => {
        setIsTyping(true);

        try {
            const response = await runRAG(key, question); // Use the validated key and question

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: response.text,
                    sender: 'ai',
                    timestamp: new Date()
                }
            ]);
        } catch (e) {
            // Re-throw or handle the error such that the calling function knows the key/API failed.
            // For this component, we'll return a special error code or throw the error.
            // For now, throwing the error will be caught by the handleSend logic for invalid keys.
            throw new Error("RAG execution failed, possibly due to an invalid key or API error.");
        } finally {
            setIsTyping(false);
        }
    }


    const handleSend = async () => {
        if (!input.trim()) return;

        const userQuestionOrKey = input; // Store current input
        setInput(''); // Clear input immediately
        
        // 1. Add User's Message/Key Attempt to the chat history
        const userMsg: Message = {
            id: Date.now().toString(),
            text: userQuestionOrKey,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        scrollToBottom();


        // CASE 1: The user is currently entering the API key (awaitingApiKey is TRUE)
        if (awaitingApiKey) {
            const keyAttempt = userQuestionOrKey.trim();
            setAwaitingApiKey(false); // We are attempting validation now

            const questionToRun = pendingQuestion; 
            // We clear the pending question because we are about to run it (or fail trying)
            setPendingQuestion(null); 

            setMessages(prev => [
                ...prev,
                {
                    id: "checking_key",
                    // Updated message to reflect that we are answering the question as a test
                    text: `⏳ Verifying key and attempting to answer the saved question...`,
                    sender: "ai",
                    timestamp: new Date(),
                }
            ]);
            
            scrollToBottom(); 
            
            // --- KEY VALIDATION VIA RAG EXECUTION ---
            
            let valid = false;
            if (questionToRun) {
                try {
                    // Start typing indicator, but this is handled inside runRagQuery, 
                    // so we'll just call it and rely on its success/failure.
                    const response = await runRAG(keyAttempt, questionToRun);
                    valid = true;
                    
                    // Key is valid - Set the key, store it, and set the answer
                    localStorage.setItem("geminiKey", keyAttempt);
                    setApiKey(keyAttempt);

                    // Add success message
                    const verifiedMessage: Message = {
                        id: "verified",
                        text: "🎉 API Key verified! Here is the answer to your question:",
                        sender: "ai",
                        timestamp: new Date(),
                    };
                    
                    // Add the RAG answer (which also serves as the validation proof)
                    const answerMessage: Message = {
                        id: Date.now().toString(),
                        text: response.text,
                        sender: 'ai',
                        timestamp: new Date()
                    }

                    // Must use setMessages to append all at once or use a function form to ensure order
                    setMessages(prev => [...prev.filter(m => m.id !== "checking_key"), verifiedMessage, answerMessage]);

                } catch (err) {
                    // If runRAG fails, the key is invalid or there's an RAG config issue.
                    valid = false;
                    console.error("API Key verification via RAG failed:", err);
                }
            }
            
            if (!valid) {
                // If invalid, go back to awaiting key state
                setAwaitingApiKey(true);
                
                // Re-store the pending question if the validation failed, 
                // so the user can try again with a different key.
                if (questionToRun) setPendingQuestion(questionToRun); 

                setMessages(prev => [
                    ...prev.filter(m => m.id !== "checking_key"), // Remove the checking message
                    {
                        id: "invalid_key",
                        text: "❌ Invalid API key. The attempt to run your question failed. Please try a different key.",
                        sender: "ai",
                        timestamp: new Date(),
                    }
                ]);
                return;
            }
            
            return; // Key verification is complete and question is answered (if successful)
        }

        // CASE 2: No API key yet → ask user to enter it 
        if (!apiKey) {
            setAwaitingApiKey(true);
            // Store the original question as pending
            setPendingQuestion(userQuestionOrKey); 
            
            setMessages(prev => [
                ...prev,
                {
                    id: `request_api-${Date.now()}`,
                    text: "🔑 Please enter your Gemini API key to continue. **Your question has been saved and will run automatically after verification.**",
                    sender: "ai",
                    timestamp: new Date(),
                }
            ]);
            return;
        }

        // CASE 3: Normal chat flow with valid API key
        if (apiKey) {
            // Note: runRagQuery handles setIsTyping and setMessages internally.
            await runRagQuery(apiKey, userQuestionOrKey);
        }
    };

    return (
        <div className="floating-chat-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    >
                        <div className="chat-header">
                            <div className="ai-info">
                                <Bot size={20} />
                                <span>AI Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <div className="bubble">{msg.text}</div>
                                    <span className="time">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="message ai">
                                    <div className="bubble typing">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder={awaitingApiKey ? "Enter API Key..." : "Ask something..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                aria-label="Chat message input"
                                // Use the input type for API key entry to obscure the key (though security is minimal on client-side localStorage)
                                // We keep it as 'text' for ease of copy/paste unless you explicitly want 'password'.
                                // type={awaitingApiKey ? "password" : "text"} 
                            />
                            <button className="send-btn" onClick={handleSend} aria-label="Send message">
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                className="chat-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default FloatingChat;