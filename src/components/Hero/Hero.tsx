import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import GlassCard from '../GlassCard/GlassCard';
import { resumeData } from '../../data/resume';
import './Hero.scss';

const Hero: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="hero-section">
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="greeting">
                    <span className="hello">Hello, I'm</span>
                    <h1 className="name">
                        {resumeData.name.split(' ')[0]}
                        <span className="dot">.</span>
                    </h1>
                </motion.div>

                <motion.h2 variants={itemVariants} className="role">
                    {resumeData.hero.role1} <span className="separator">&</span> {resumeData.hero.role2}
                </motion.h2>

                <motion.p variants={itemVariants} className="bio">
                    {resumeData.hero.p1}
                </motion.p>

                <motion.div variants={itemVariants} className="cta-group">
                    <a href="/projects" className="primary-btn">
                        View Work <ArrowRight size={18} />
                    </a>
                    <a href="/contact" className="secondary-btn">
                        Contact Me
                    </a>
                </motion.div>

                <motion.div variants={itemVariants} className="social-links">
                    <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github size={24} />
                        <span className="sr-only">GitHub Profile</span>
                    </a>
                    <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin size={24} />
                        <span className="sr-only">LinkedIn Profile</span>
                    </a>
                    <a href={`mailto:${resumeData.contact.email}`} aria-label="Email">
                        <Mail size={24} />
                        <span className="sr-only">Send Email</span>
                    </a>
                    <a href="https://drive.google.com/file/d/10vp81RVSZhhdysMvzjt_BPwx5K0lxvkV/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                        <FileText size={24} />
                        <span className="sr-only">Download Resume</span>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <GlassCard className="visual-card main-card">
                    <div className="code-snippet">
                        <pre>
                            <code>
                                <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}
                                {'\n'}  <span className="property">name</span>: <span className="string">"{resumeData.hero.name}"</span>,
                                {'\n'}  <span className="property">skills</span>: [<span className="string">{resumeData.hero.skills1}</span>, <span className="string">{resumeData.hero.skills2}</span>, <span className="string">{resumeData.hero.skills3}</span>],
                                {'\n'}  <span className="property">passion</span>: <span className="string">{resumeData.hero.passion}</span>
                                {'\n'}{'}'};
                            </code>
                        </pre>
                    </div>
                </GlassCard>

                <GlassCard className="visual-card float-card-1" delay={0.6}>
                    <div className="stat">
                        <span className="number">{resumeData.hero.exp}+</span>
                        <span className="label">Years Exp</span>
                    </div>
                </GlassCard>

                <GlassCard className="visual-card float-card-2" delay={0.8}>
                    <div className="stat">
                        <span className="number">{resumeData.projects.length}+ </span>
                        <span className="label">Projects</span>
                    </div>
                </GlassCard>
            </motion.div>
        </section>
    );
};

export default Hero;
