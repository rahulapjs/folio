import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';

// Placeholders for other pages
const Journey = () => <div style={{ padding: '100px', textAlign: 'center' }}>Journey Page (Coming Soon)</div>;
const Skills = () => <div style={{ padding: '100px', textAlign: 'center' }}>Skills Page (Coming Soon)</div>;
const Projects = () => <div style={{ padding: '100px', textAlign: 'center' }}>Projects Page (Coming Soon)</div>;
const Contact = () => <div style={{ padding: '100px', textAlign: 'center' }}>Contact Page (Coming Soon)</div>;

const AppRouter: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;
