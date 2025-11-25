import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import GlassCard from '../GlassCard/GlassCard';
import { resumeData } from '../../data/resume';
import './ContactForm.scss';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Message sent! (Placeholder)');
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Get in Touch</h2>
                    <p>Have a project in mind or just want to say hi? Feel free to reach out!</p>

                    <div className="info-items">
                        <GlassCard className="info-card">
                            <Mail className="icon" />
                            <span>{resumeData.contact.email}</span>
                        </GlassCard>

                        <GlassCard className="info-card">
                            <Phone className="icon" />
                            <span>{resumeData.contact.phone}</span>
                        </GlassCard>

                        <GlassCard className="info-card">
                            <MapPin className="icon" />
                            <span>{resumeData.location}</span>
                        </GlassCard>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="form-wrapper"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <GlassCard className="contact-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Your message..."
                                rows={5}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default ContactForm;
