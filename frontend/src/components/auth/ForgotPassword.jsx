import { FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';

export default function ForgotPassword({ onBack, onNext }) {
    const { t } = useLanguage();

    return (
        <form className="space-y-6 animate-fade-in" onSubmit={(e) => e.preventDefault()}>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('auth.recover')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                    {t('auth.recover_desc')}
                </p>
            </div>

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

            <button
                onClick={onNext}
                className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all"
            >
                {t('auth.send_code')}
            </button>

            <button
                type="button"
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
                <FaArrowLeft />
                {t('auth.back_login')}
            </button>
        </form>
    );
}
