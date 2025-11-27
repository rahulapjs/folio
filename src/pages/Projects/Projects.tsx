import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { seo, resumeData } from '../../data/resume';
import './Projects.scss';
import { Helmet } from "react-helmet"

const Projects: React.FC = () => {
    return (
        <motion.div
            className="projects-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* SEO TAGS */}
            <Helmet>
                <title>{seo.projects.title}</title>
                <meta name="description" content={seo.projects.description} />
            </Helmet>
            <div className="page-header">
                <h1>Featured Projects</h1>
                <p>A selection of my recent work.</p>
            </div>

            <div className="projects-grid">
                {resumeData.projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;
