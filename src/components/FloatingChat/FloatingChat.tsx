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
    const [apiKey, setApiKey] = useState<string>(() => sessionStorage.getItem("geminiKey") || "");
    const [awaitingApiKey, setAwaitingApiKey] = useState(false);
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

    const runRagQuery = async (key: string, question: string) => {
        setIsTyping(true);

        try {
            const response = await runRAG(key, question);

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
            console.error(e)
        } finally {
            setIsTyping(false);
        }
    }


    const handleSend = async () => {
        if (!input.trim()) return;

        const userQuestionOrKey = input;
        setInput(''); 
        
        const userMsg: Message = {
            id: Date.now().toString(),
            text: userQuestionOrKey,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        scrollToBottom();

        if (awaitingApiKey) {
            const keyAttempt = userQuestionOrKey.trim();
            setAwaitingApiKey(false); 

            const questionToRun = pendingQuestion; 
            setPendingQuestion(null); 

            setMessages(prev => [
                ...prev,
                {
                    id: "checking_key",
                    text: `⏳ Verifying key and attempting to answer the saved question...`,
                    sender: "ai",
                    timestamp: new Date(),
                }
            ]);
            
            scrollToBottom(); 
            
            let valid = false;
            if (questionToRun) {
                try {
                    const response = await runRAG(keyAttempt, questionToRun);
                    valid = true;
                    
                    sessionStorage.setItem("geminiKey", keyAttempt);
                    setApiKey(keyAttempt);

                    const verifiedMessage: Message = {
                        id: "verified",
                        text: "🎉 API Key verified! Here is the answer to your question:",
                        sender: "ai",
                        timestamp: new Date(),
                    };
                    
                    const answerMessage: Message = {
                        id: Date.now().toString(),
                        text: response.text,
                        sender: 'ai',
                        timestamp: new Date()
                    }

                    setMessages(prev => [...prev.filter(m => m.id !== "checking_key"), verifiedMessage, answerMessage]);

                } catch (err) {
                    valid = false;
                    console.error("API Key verification via RAG failed:", err);
                }
            }
            
            if (!valid) {
                setAwaitingApiKey(true);

                if (questionToRun) setPendingQuestion(questionToRun); 

                setMessages(prev => [
                    ...prev.filter(m => m.id !== "checking_key"),
                    {
                        id: "invalid_key",
                        text: "❌ Invalid API key. The attempt to run your question failed. Please try a different key.",
                        sender: "ai",
                        timestamp: new Date(),
                    }
                ]);
                return;
            }
            
            return;
        }

        if (!apiKey) {
            setAwaitingApiKey(true);
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

        if (apiKey) {
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