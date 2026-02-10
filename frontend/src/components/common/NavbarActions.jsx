import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import AuthModal from '../auth/AuthModal';
import Logo from './Logo';



export default function NavbarActions({ className = "" }) {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Initialize state from URL
    const [searchParams] = useSearchParams();
    const currentQuery = searchParams.get('q') || '';

    const [isSearchOpen, setIsSearchOpen] = useState(!!currentQuery);
    const [searchQuery, setSearchQuery] = useState(currentQuery);
    const navigate = useNavigate();
    const location = useLocation();

    // Loop sync: Update local state when URL changes
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
            setIsSearchOpen(true);
        } else {
            // Only close if we are NOT on search page (processed by close button) 
            // OR if we navigated away to a non-search page.
            if (!location.search.includes('q=')) {
                setSearchQuery('');
                setIsSearchOpen(false);
            }
        }
    }, [searchParams, location.search]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
    };

    return (
        <div className={`flex items-center justify-between w-full ${className}`}>
            {/* Left: Logo */}
            <div className="shrink-0 mr-8">
                <Logo />
            </div>

            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <Link to="/user/home" className="text-base font-bold text-gray-700 dark:text-gray-300 hover:text-[#F59E0B] transition-colors tracking-wide">
                    {t('nav.home')}
                </Link>
                <Link to="/user/products" className="text-base font-bold text-gray-700 dark:text-gray-300 hover:text-[#F59E0B] transition-colors tracking-wide">
                    {t('nav.products')}
                </Link>
                <button
                    onClick={() => {
                        const footer = document.getElementById('main-footer');
                        if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="text-base font-bold text-gray-700 dark:text-gray-300 hover:text-[#F59E0B] transition-colors tracking-wide"
                >
                    {t('nav.news')}
                </button>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full border border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                    title={t('nav.toggle_theme')}
                >
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </button>

                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="text-sm font-bold text-text-light dark:text-text-dark p-2 rounded-full border border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all w-10 h-10 flex items-center justify-center uppercase"
                    title={t('nav.change_language')}
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Clear search query from URL (if on search page) or just close if not
                                if (location.pathname === '/search') {
                                    navigate(location.pathname); // clear query param
                                } else {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }
                            }}
                            className="material-symbols-outlined text-xl text-gray-500 hover:text-primary ml-2 cursor-pointer"
                            title={t('nav.close')}
                        >
                            close
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full border border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                        title={t('nav.search_title')}
                    >
                        search
                    </button>
                )}

                {/* User Icon */}
                <button
                    onClick={() => navigate('/user/profile')}
                    className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full border border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                    title={t('nav.account')}
                >
                    person
                </button>

                {/* Cart Icon */}
                <button
                    onClick={() => navigate('/user/cart')}
                    className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark p-2 rounded-full border border-transparent hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                    title={t('nav.cart')}
                >
                    shopping_cart
                </button>

                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </div>
        </div >
    );
}
