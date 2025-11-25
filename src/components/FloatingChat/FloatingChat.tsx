import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Paperclip, Bot } from 'lucide-react';
import './FloatingChat.scss';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

// Placeholder function for RAG
async function sendMessageToRAG(query: string) {
    console.log("Sending query to RAG:", query);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        text: "This is a placeholder response from the AI assistant. I'm currently being built!",
        sources: []
    };
}

const FloatingChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
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

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await sendMessageToRAG(userMsg.text);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsTyping(false);
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
                            <button onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={18} /></button>
                        </div>

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

                        <div className="chat-input">
                            <button className="attach-btn" aria-label="Attach file"><Paperclip size={18} /></button>
                            <input
                                type="text"
                                placeholder="Ask something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                aria-label="Chat message input"
                            />
                            <button className="send-btn" onClick={handleSend} aria-label="Send message">
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
