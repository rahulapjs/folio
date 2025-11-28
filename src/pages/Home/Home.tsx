import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
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
            <Hero />
        </motion.div>
    );
};

export default Home;
