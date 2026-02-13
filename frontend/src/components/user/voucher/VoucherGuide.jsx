import { FaCamera, FaShoppingCart, FaTags } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function VoucherGuide({ onBack }) {
    const { t } = useLanguage();

    const steps = [
        {
            id: 1,
            title: t('voucher.guideStep1Title'),
            description: t('voucher.guideStep1Desc'),
            icon: <FaCamera className="text-orange-500" />,
            visualText: "Camera Pro 4K UHD",
            visualIcon: <FaCamera className="text-orange-500" />
        },
        {
            id: 2,
            title: t('voucher.guideStep2Title'),
            description: t('voucher.guideStep2Desc'),
            icon: <FaShoppingCart className="text-orange-500" />,
            visualText: t('voucher.guideStep2Visual'),
            visualIcon: <FaShoppingCart className="text-orange-500" />
        },
        {
            id: 3,
            title: t('voucher.guideStep3Title'),
            description: t('voucher.guideStep3Desc'),
            icon: <FaTags className="text-orange-500" />,
            visualText: "CAMERAHUB50",
            visualIcon: <FaTags className="text-orange-500" />,
            isApplied: true
        }
    ];

    return (
        <div className="flex flex-col h-full animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('voucher.guideTitle')}</h3>
            </div>

            <div className="space-y-8 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[31px] top-4 bottom-8 w-0.5 bg-orange-500 -z-0"></div>

                {steps.map((step) => (
                    <div key={step.id} className="relative flex gap-4">
                        {/* Step Number */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EA9D29] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/20 z-10">
                            {step.id}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 leading-tight">{step.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Visual Box */}
                            <div className={`bg-white dark:bg-gray-800 border ${step.isApplied ? 'border-dashed border-orange-300 dark:border-orange-800' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-3 flex items-center justify-between shadow-sm`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-500 text-sm">
                                        {step.visualIcon}
                                    </div>
                                    <span className={`text-sm font-medium ${step.isApplied ? 'text-orange-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {step.visualText}
                                    </span>
                                </div>
                                {step.isApplied && (
                                    <span className="text-xs font-bold text-gray-400">{t('voucher.applied')}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
