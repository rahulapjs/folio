import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, Code, Layers, Mail } from 'lucide-react';
import './Navbar.scss';

const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/journey', label: 'Journey', icon: <Compass size={20} /> },
    { path: '/skills', label: 'Skills', icon: <Code size={20} /> },
    { path: '/projects', label: 'Projects', icon: <Layers size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
];

const Navbar: React.FC = () => {
    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="logo">
                Rahul<span>.dev</span>
            </div>

            <ul className="nav-links">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="icon">{item.icon}</span>
                                    <span className="label">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeNav"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Navbar;
