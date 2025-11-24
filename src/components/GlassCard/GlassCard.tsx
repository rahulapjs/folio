import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.scss';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    hoverEffect = true,
    delay = 0
}) => {
    return (
        <motion.div
            className={`glass-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hoverEffect ? { scale: 1.02, translateY: -5 } : {}}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
