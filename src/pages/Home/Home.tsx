import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/GlassCard/GlassCard';
import { resumeData } from '../../data/resume';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="hero-content">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Hello, I'm <span className="highlight">{resumeData.name.split(' ')[0]}</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Frontend Architect & UI/UX Engineer
                </motion.p>

                <GlassCard className="intro-card" delay={0.4}>
                    <p>
                        Building premium, glassmorphic web experiences with React, TypeScript, and SCSS.
                        <br />
                        Based in {resumeData.location}.
                    </p>
                </GlassCard>
            </div>
        </motion.div>
    );
};

export default Home;
