import { FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import Logo from '../common/Logo';

export default function TermsOfService({ onBack }) {
    const { t } = useLanguage();

    const sections = [
        {
            title: t('auth.term_1_title'),
            desc: t('auth.term_1_desc'),
            items: [t('auth.term_1_li1'), t('auth.term_1_li2'), t('auth.term_1_li3')]
        },
        {
            title: t('auth.term_2_title'),
            desc: t('auth.term_2_desc'),
            items: [t('auth.term_2_li1'), t('auth.term_2_li2'), t('auth.term_2_li3')]
        },
        {
            title: t('auth.term_3_title'),
            desc: t('auth.term_3_desc'),
            items: [t('auth.term_3_li1'), t('auth.term_3_li2')]
        },
        {
            title: t('auth.term_4_title'),
            desc: t('auth.term_4_desc'),
            items: [t('auth.term_4_li1'), t('auth.term_4_li2')]
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-[500px]">
            <div className="shrink-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-2"
                >
                    <FaArrowLeft /> {t('auth.back_auth')}
                </button>
                <div className="mb-4 flex justify-center">
                    {/* <Logo textClassName="text-xl" /> */}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('auth.terms_title')}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('auth.terms_update')}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-gray-600 dark:text-gray-300 custom-scrollbar">
                {sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex gap-2 font-bold text-gray-900 dark:text-white">
                            <span className="bg-orange-100 text-orange-600 w-5 h-5 flex items-center justify-center rounded text-xs shrink-0 mt-0.5">
                                {index + 1}
                            </span>
                            <span>{section.title.substring(3)}</span>
                        </div>
                        <p className="pl-7 text-xs italic opacity-80">{section.desc}</p>
                        <ul className="pl-11 list-disc space-y-1">
                            {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={onBack}
                    className="w-full h-11 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all"
                >
                    {t('auth.term_btn')}
                </button>
            </div>
        </div>
    );
}
