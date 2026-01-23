import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import AuthModal from '../auth/AuthModal';
import Logo from './Logo';

export default function NavbarActions({ className = "" }) {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="mr-2">
                <Logo />
            </div>
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Toggle Theme"
            >
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </button>

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="text-sm font-bold text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-10 h-10 flex items-center justify-center uppercase"
                title="Change Language"
            >
                {language}
            </button>

            {/* Search Field */}
            {isSearchOpen ? (
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 transition-all animate-fade-in border border-gray-200 dark:border-gray-700">
                    <input
                        type="text"
                        placeholder={t('nav.search')}
                        className="bg-transparent border-none outline-none text-sm w-32 lg:w-48 text-text-light dark:text-text-dark placeholder-gray-500"
                        autoFocus
                    />
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="material-symbols-outlined text-xl text-gray-500 hover:text-primary ml-2 cursor-pointer"
                    >
                        close
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Search"
                >
                    search
                </button>
            )}

            {/* User Icon */}
            <button
                onClick={() => setIsAuthModalOpen(true)}
                className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Account"
            >
                person
            </button>

            {/* Cart Icon */}
            <button
                className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Cart"
            >
                shopping_cart
            </button>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}
