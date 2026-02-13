import { FaTicketAlt } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function VoucherInput({ value, onChange, onApply }) {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-800 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t('voucher.addNew')}</span>
            </div>
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-300">
                        <FaTicketAlt />
                    </div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={t('voucher.placeholder')}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                </div>
                <button
                    onClick={onApply}
                    disabled={!value}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase transition-colors ${value
                            ? 'bg-[#F59E0B] text-white hover:bg-[#d97706] shadow-md shadow-orange-500/20'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {t('checkout.apply')}
                </button>
            </div>
        </div>
    );
}
