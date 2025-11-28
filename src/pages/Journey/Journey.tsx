import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '../../components/Timeline/Timeline';
import './Journey.scss';

const Journey: React.FC = () => {
    return (
        <motion.div
            className="journey-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="page-header">
                <h1>My Journey</h1>
                <p>A timeline of my professional experience and education.</p>
            </div>
            <Timeline />
        </motion.div>
    );
};

export default Journey;
