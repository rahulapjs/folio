import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon, Zap, Cloud } from 'lucide-react';
import { useTheme, Theme } from '../../context/ThemeContext';
import './ThemeSwitcher.scss';

const themes: { id: Theme; icon: React.ReactNode; label: string; color: string }[] = [
    { id: 'light', icon: <Sun size={18} />, label: 'Neo Light', color: '#f0f4f8' },
    { id: 'dark', icon: <Moon size={18} />, label: 'Dark Carbon', color: '#101010' },
    { id: 'neon', icon: <Zap size={18} />, label: 'Cyber Neon', color: '#050505' },
    { id: 'pastel', icon: <Cloud size={18} />, label: 'Pastel Ice', color: '#fdfbf7' },
];

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="theme-switcher-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="theme-options"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                                onClick={() => setTheme(t.id)}
                                title={t.label}
                            >
                                {t.icon}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Palette size={24} />
            </motion.button>
        </div>
    );
};

export default ThemeSwitcher;
