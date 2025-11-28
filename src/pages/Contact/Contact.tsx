import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../../components/ContactForm/ContactForm';
import './Contact.scss';

const Contact: React.FC = () => {
    return (
        <motion.div
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="page-content">
                <ContactForm />
            </div>
        </motion.div>
    );
};

export default Contact;
