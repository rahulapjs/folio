import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import Journey from './pages/Journey/Journey';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

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
