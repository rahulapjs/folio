import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import FloatingChat from './components/FloatingChat/FloatingChat';
import AppRouter from './router';
import './styles/global.scss';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <div className="page-container">
                    <Navbar />
                    <ThemeSwitcher />
                    <AppRouter />
                    <FloatingChat />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
