import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import GlassCard from '../GlassCard/GlassCard';
import './ProjectCard.scss';

interface ProjectProps {
    project: {
        title: string;
        subtitle: string;
        tech: string[];
        description: string[];
        link?: string;
        github?: string;
    };
    index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <GlassCard className="project-card">
                <div className="card-header">
                    <div className="icon-wrapper">
                        <Code size={24} />
                    </div>
                    <div className="title-group">
                        <h3>{project.title}</h3>
                        <span className="subtitle">{project.subtitle}</span>
                    </div>
                </div>

                <div className="card-body">
                    <ul className="description-list">
                        {project.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>
                </div>

                <div className="card-footer">
                    <div className="tech-stack">
                        {project.tech.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                        ))}
                    </div>

                    <div className="links">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Code"
                                aria-label="View Code on GitHub"
                            >
                                <Github size={20} />
                                <span className="sr-only">View Code on GitHub</span>
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Live Demo"
                                aria-label="View Live Demo"
                            >
                                <ExternalLink size={20} />
                                <span className="sr-only">View Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
};

export default ProjectCard;
