import React from 'react';
import { motion } from 'framer-motion';
import SkillGrid from '../../components/SkillGrid/SkillGrid';
import './Skills.scss';
import { Helmet } from "react-helmet"
import { seo } from '../../data/resume';

const Skills: React.FC = () => {
    return (
        <motion.div
            className="skills-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* SEO TAGS */}
            <Helmet>
                <title>{seo.skills.title}</title>
                <meta name="description" content={seo.skills.description} />
            </Helmet>
            <div className="page-header">
                <h1>Technical Skills</h1>
                <p>Technologies and tools I work with.</p>
            </div>
            <SkillGrid />
        </motion.div>
    );
};

export default Skills;
