import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';

export default function SignIn({ onForgotPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();

    return (
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{t('auth.email')}</label>
                <div className="relative group">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
                    <input
                        type="email"
                        placeholder="ban@example.com"
                        className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{t('auth.password')}</label>
                <div className="relative group">
                    <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                    {t('auth.forgot')}
                </button>
            </div>

            <button className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all">
                {t('auth.login')}
            </button>
        </form>
    );
}
