import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../GlassCard/GlassCard';
import { resumeData } from '../../data/resume';
import './SkillGrid.scss';

const SkillGrid: React.FC = () => {
    const categories = Object.keys(resumeData.skills) as Array<keyof typeof resumeData.skills>;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4 },
        },
    };

    return (
        <div className="skill-grid-container">
            {categories.map((category) => (
                <div key={category} className="skill-category">
                    <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <motion.div
                        className="skills-wrapper"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {resumeData.skills[category].map((skill) => (
                            <motion.div key={skill} variants={itemVariants}>
                                <GlassCard className="skill-card" hoverEffect={true}>
                                    <span className="skill-name">{skill}</span>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default SkillGrid;
