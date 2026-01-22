import { FaArrowLeft, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

export default function PrivacyPolicy({ onBack }) {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-[600px] w-full max-w-[480px]">
            <div className="shrink-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-4"
                >
                    <FaArrowLeft /> {t('auth.back_auth')}
                </button>
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#E58F10]">CameraHub.</h2>
                    <p className="text-xs text-gray-400 italic">{t('auth.terms_update')}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                    {t('auth.privacy_title')}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-8 text-sm text-gray-600 dark:text-gray-300 custom-scrollbar pb-4">
                {/* Section 1 */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-l-4 border-[#E58F10] pl-3">
                        {t('auth.privacy_1_title')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('auth.privacy_1_desc')}</p>
                    <ul className="space-y-2 pl-4">
                        <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></span>
                            <span>{t('auth.privacy_1_li1')}</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></span>
                            <span>{t('auth.privacy_1_li2')}</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></span>
                            <span>{t('auth.privacy_1_li3')}</span>
                        </li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-l-4 border-[#E58F10] pl-3">
                        {t('auth.privacy_2_title')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('auth.privacy_2_desc')}</p>
                    <div className="grid gap-3">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('auth.privacy_2_card1_title')}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('auth.privacy_2_card1_desc')}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('auth.privacy_2_card2_title')}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('auth.privacy_2_card2_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-l-4 border-[#E58F10] pl-3">
                        {t('auth.privacy_3_title')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 truncate-lines-2">
                        {t('auth.privacy_3_desc').split('không bán')[0]}
                        <span className="font-bold text-gray-900 dark:text-white">không bán</span>
                        {t('auth.privacy_3_desc').split('không bán')[1]}
                    </p>
                    <ul className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <li key={i} className="flex gap-3 items-start">
                                <FaCheckCircle className="text-[#E58F10] mt-0.5 shrink-0" />
                                <span>{t(`auth.privacy_3_li${i}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-l-4 border-[#E58F10] pl-3">
                        {t('auth.privacy_4_title')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{t('auth.privacy_4_desc')}</p>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[1, 2, 3].map(i => (
                            <button key={i} className="w-full flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-[#E58F10] transition-colors">
                                    {t(`auth.privacy_4_li${i}`)}
                                </span>
                                <FaChevronRight className="text-gray-300 group-hover:text-[#E58F10] transition-colors text-xs" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="shrink-0 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={onBack}
                    className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all"
                >
                    {t('auth.privacy_btn')}
                </button>
            </div>
        </div>
    );
}
