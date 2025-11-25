import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import GlassCard from '../GlassCard/GlassCard';
import { resumeData } from '../../data/resume';
import './Timeline.scss';

const Timeline: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="timeline-container">
            <motion.div
                className="timeline-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2 className="section-title">Experience</h2>
                <div className="timeline">
                    {resumeData.experience.map((exp, index) => (
                        <motion.div key={index} variants={itemVariants} className="timeline-item">
                            <div className="timeline-marker">
                                <Briefcase size={18} />
                            </div>
                            <div className="timeline-content">
                                <GlassCard className="timeline-card">
                                    <div className="header">
                                        <h3>{exp.role}</h3>
                                        <span className="company">{exp.company}</span>
                                    </div>
                                    <div className="meta">
                                        <Calendar size={14} />
                                        <span>{exp.year}</span>
                                    </div>
                                    <ul className="description">
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="timeline-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <h2 className="section-title">Education</h2>
                <div className="timeline">
                    {resumeData.education.map((edu, index) => (
                        <motion.div key={index} variants={itemVariants} className="timeline-item">
                            <div className="timeline-marker edu">
                                <GraduationCap size={18} />
                            </div>
                            <div className="timeline-content">
                                <GlassCard className="timeline-card">
                                    <div className="header">
                                        <h3>{edu.degree}</h3>
                                        <span className="company">{edu.institution}</span>
                                    </div>
                                    <div className="meta">
                                        <Calendar size={14} />
                                        <span>{edu.year}</span>
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Timeline;
