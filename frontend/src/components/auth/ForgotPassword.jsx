import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';
import authService from '../../services/authService';

export default function ForgotPassword({ onBack, onNext }) {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await authService.forgotPassword(email);
            setStatus({ type: 'success', message: 'Mã xác thực đã được gửi!' });
            setTimeout(() => {
                onNext();
            }, 1000);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send reset email' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit}>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('auth.recover')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                    {t('auth.recover_desc')}
                </p>
            </div>

            {status.message && (
                <div className={`text-sm text-center font-bold px-4 py-2 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {status.message}
                </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{t('auth.email')}</label>
                <div className="relative group">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ban@example.com"
                        className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                    />
                </div>
            </div>

            <button
                disabled={loading}
                className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Sending...' : t('auth.send_code')}
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
