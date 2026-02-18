
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function VoucherConditions({ onBack }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full animate-fade-in-up">
            {/* Header */}
            <div className="relative flex items-center justify-center mb-2 sticky top-0 bg-white dark:bg-gray-900 z-10 py-4 px-5 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <button
                    onClick={onBack}
                    className="absolute left-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 p-1 transition-colors"
                >
                    <FaChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('voucher.conditionsTitle')}</h3>
                <button
                    onClick={onBack}
                    className="absolute right-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 p-1 transition-colors"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 custom-scrollbar text-sm space-y-6 text-gray-600 dark:text-gray-300 pb-4">

                {/* Section 1 */}
                <div className="space-y-3">
                    <h4 className="font-bold text-[#EA9D29] border-l-[3px] border-[#EA9D29] pl-3 uppercase text-[15px]">
                        {t('voucher.cond1Title')}
                    </h4>
                    <p className="leading-relaxed text-justify text-[14px]">
                        {t('voucher.cond1Desc')}
                    </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                    <h4 className="font-bold text-[#EA9D29] border-l-[3px] border-[#EA9D29] pl-3 uppercase text-[15px]">
                        {t('voucher.cond2Title')}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 leading-relaxed text-justify marker:text-[#EA9D29] text-[14px]">
                        <li>{t('voucher.cond2Item1')}</li>
                        <li>{t('voucher.cond2Item2')}</li>
                        <li>{t('voucher.cond2Item3')}</li>
                        <li>{t('voucher.cond2Item4')}</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                    <h4 className="font-bold text-[#EA9D29] border-l-[3px] border-[#EA9D29] pl-3 uppercase text-[15px]">
                        {t('voucher.cond3Title')}
                    </h4>
                    <p className="leading-relaxed text-justify text-[14px]">
                        {t('voucher.cond3Desc')}
                    </p>
                    <p className="leading-relaxed text-justify text-[14px]">
                        {t('voucher.cond3Desc2')}
                    </p>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                    <h4 className="font-bold text-[#EA9D29] border-l-[3px] border-[#EA9D29] pl-3 uppercase text-[15px]">
                        {t('voucher.cond4Title')}
                    </h4>
                    <div className="bg-[#FFF7ED] dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30">
                        <p className="leading-relaxed text-justify text-gray-700 dark:text-gray-200 text-[14px]">
                            {t('voucher.cond4Desc')}
                        </p>
                    </div>
                </div>

                {/* Section 5 */}
                <div className="space-y-3">
                    <h4 className="font-bold text-[#EA9D29] border-l-[3px] border-[#EA9D29] pl-3 uppercase text-[15px]">
                        {t('voucher.cond5Title')}
                    </h4>
                    <p className="leading-relaxed text-justify text-[14px]">
                        {t('voucher.cond5Desc')}
                    </p>
                </div>
            </div>

            {/* Footer Button */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <button
                    onClick={onBack}
                    className="w-full py-3 bg-[#EA9D29] hover:bg-[#d97706] text-white rounded-lg font-bold text-base transition-colors shadow-lg shadow-orange-500/20"
                >
                    {t('voucher.agreeBtn')}
                </button>
            </div>
        </div>
    );
}
