import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import SignIn from './SignIn';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import VerifyOTP from './VerifyOTP';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

import Logo from '../common/Logo';

export default function AuthModal({ isOpen, onClose }) {
    const [view, setView] = useState('login'); // 'login', 'register', 'forgot', 'verify_otp'
    const { t } = useLanguage();

    // Reset view when modal opens
    useEffect(() => {
        if (isOpen) setView('login');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className={`relative w-full max-w-[440px] bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl scale-100 animate-fade-in transition-all ${view === 'register' ? 'my-8' : ''}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <Logo />
                    {view !== 'forgot' && view !== 'verify_otp' && view !== 'terms' && view !== 'privacy' && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            {t('auth.tagline')}
                        </p>
                    )}
                </div>

                {/* Tabs - Only show for Login/Register */}
                {view !== 'forgot' && view !== 'verify_otp' && view !== 'terms' && view !== 'privacy' && (
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl mb-6">
                        <button
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'login'
                                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            onClick={() => setView('login')}
                        >
                            {t('auth.login')}
                        </button>
                        <button
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'register'
                                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            onClick={() => setView('register')}
                        >
                            {t('auth.register')}
                        </button>
                    </div>
                )}

                {/* Content */}
                {view === 'login' && <SignIn onForgotPassword={() => setView('forgot')} />}
                {view === 'register' && <Register />}
                {view === 'forgot' && (
                    <ForgotPassword
                        onBack={() => setView('login')}
                        onNext={() => setView('verify_otp')}
                    />
                )}
                {view === 'verify_otp' && <VerifyOTP onSuccess={() => setView('login')} />}
                {view === 'terms' && <TermsOfService onBack={() => setView('login')} />}
                {view === 'privacy' && <PrivacyPolicy onBack={() => setView('login')} />}

                {/* Social Login & Footer - Only on Login/Register */}
                {view !== 'forgot' && view !== 'verify_otp' && view !== 'terms' && view !== 'privacy' && (
                    <>


                        {/* Footer Text */}
                        <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                            {t('auth.agreement_pre')} <button onClick={() => setView('terms')} className="text-[#F59E0B] hover:underline font-bold">{t('auth.terms')}</button> {t('auth.agreement_and')} <button onClick={() => setView('privacy')} className="text-[#F59E0B] hover:underline font-bold">{t('auth.privacy')}</button> {t('auth.agreement_post')}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
