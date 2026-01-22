import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import AuthModal from '../auth/AuthModal';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto flex items-center px-4 lg:px-8 h-20 relative justify-between">
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden">
                            menu
                        </button>
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center lg:text-left">
                            CameraHub
                        </h2>
                    </div>
                    <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
                        <button
                            className="text-base font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('nav.home')}
                        </button>
                        <button
                            className="text-base font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                            onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('nav.cameras')}
                        </button>
                        <button
                            className="text-base font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                            onClick={() => document.getElementById('special-offers')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('nav.lenses')}
                        </button>
                        <button
                            className="text-base font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                            onClick={() => document.getElementById('special-offers')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('nav.accessories')}
                        </button>
                        <button
                            className="text-base font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('nav.news')}
                        </button>
                    </nav>
                    <div className="flex items-center gap-2 shrink-0">
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
                            >
                                search
                            </button>
                        )}
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="hidden lg:block material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            person
                        </button>
                        <button className="hidden lg:block material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            shopping_cart
                        </button>
                    </div>
                </div>
            </div>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
