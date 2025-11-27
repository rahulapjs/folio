import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
import './Home.scss';
import { Helmet } from "react-helmet"
import { seo } from '../../data/resume';

const Home: React.FC = () => {
    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* SEO TAGS */}
            <Helmet>
                <title>{seo.home.title}</title>
                <meta name="description" content={seo.home.description} />
            </Helmet>
            <Hero />
        </motion.div>
    );
};

export default Home;
