import { useState, useEffect } from 'react';
import { FaGoogle, FaFacebookF, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import SignIn from './SignIn';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import VerifyOTP from './VerifyOTP';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

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
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-black tracking-tight mb-2 text-gray-900 dark:text-white">
                        CameraHub.
                    </h2>
                    {view !== 'forgot' && view !== 'verify_otp' && view !== 'terms' && view !== 'privacy' && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                {view === 'verify_otp' && <VerifyOTP />}
                {view === 'terms' && <TermsOfService onBack={() => setView('login')} />}
                {view === 'privacy' && <PrivacyPolicy onBack={() => setView('login')} />}

                {/* Social Login & Footer - Only on Login/Register */}
                {view !== 'forgot' && view !== 'verify_otp' && view !== 'terms' && view !== 'privacy' && (
                    <>
                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">
                                    {view === 'login' ? t('auth.or') : t('auth.or_register')}
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-gray-700 dark:text-gray-300">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                <FaFacebookF className="text-blue-600 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-gray-700 dark:text-gray-300">Facebook</span>
                            </button>
                        </div>

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
