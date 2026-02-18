import { FaTruck, FaStore, FaCamera } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function VoucherItem({ voucher, onSelect, isSelected, onViewConditions }) {
    const { t } = useLanguage();

    // Helper to get icon based on type
    const getIcon = (type) => {
        switch (type) {
            case 'shipping': return <FaTruck className="text-blue-500 text-xl" />;
            case 'store': return <FaStore className="text-gray-500 text-xl" />;
            case 'all': default: return <FaCamera className="text-white text-xl" />;
        }
    };

    // Helper for background color of icon container
    const getIconBg = (type) => {
        switch (type) {
            case 'shipping': return 'bg-blue-50 text-blue-500';
            case 'store': return 'bg-gray-100 text-gray-500';
            case 'all': default: return 'bg-gray-900 text-white';
        }
    };

    const isDisabled = voucher.status === 'disabled' || voucher.status === 'out_of_stock';

    return (
        <div className={`relative flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${isSelected ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700'} mb-3 overflow-hidden transition-all hover:shadow-md`}>
            {/* Left side - Image/Icon */}
            <div className={`w-28 flex flex-col items-center justify-center border-r border-dashed border-gray-200 dark:border-gray-700 p-2 ${voucher.type === 'shipping' ? 'bg-[#eef5ff]' : 'bg-[#fff8e4]'} dark:bg-gray-800`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${voucher.type === 'all' ? 'bg-black' : ''}`}>
                    {voucher.image ? (
                        <img src={voucher.image} alt={voucher.type} className="w-full h-full object-cover rounded-full" />
                    ) : (
                        getIcon(voucher.type)
                    )}
                </div>
                <span className={`text-[10px] font-bold uppercase text-center ${voucher.type === 'shipping' ? 'text-blue-500' : 'text-orange-500'}`}>
                    {voucher.typeLabel}
                </span>
            </div>

            {/* Right side - Content */}
            <div className={`flex-1 p-3 flex flex-col justify-between ${isDisabled ? 'opacity-60 grayscale' : ''}`}>
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{voucher.title}</h4>
                    {voucher.status === 'expiring' && (
                        <p className="text-xs text-red-500 mt-0.5">{t('voucher.expiring')} {voucher.daysLeft} {t('voucher.days')}</p>
                    )}
                    {voucher.subtitle && (
                        <p className="text-xs text-gray-500 mt-0.5">{voucher.subtitle}</p>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewConditions(voucher);
                        }}
                        className="text-xs text-blue-500 mt-1 hover:underline text-left"
                    >
                        {t('voucher.conditions')}
                    </button>
                </div>

                <div className="flex items-end justify-between mt-2">
                    {/* Status text or placeholder */}
                    <span className="text-xs text-red-500">{voucher.statusText}</span>

                    {/* Action Button */}
                    {voucher.status === 'out_of_stock' ? (
                        <button disabled className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-medium rounded-full cursor-not-allowed">
                            {t('voucher.outOfStock')}
                        </button>
                    ) : voucher.isSaved ? (
                        <button
                            onClick={() => onSelect(voucher)}
                            className="px-4 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded-full hover:bg-[#d97706] transition-colors shadow-sm"
                        >
                            {t('voucher.useNow')}
                        </button>
                    ) : (
                        <button
                            onClick={() => onSelect(voucher)} // Or save action
                            className="px-4 py-1 border border-[#F59E0B] text-[#F59E0B] text-xs font-bold rounded-full hover:bg-orange-50 transition-colors"
                        >
                            {t('voucher.save')}
                        </button>
                    )}
                </div>
            </div>

            {/* Decorative circles for ticket effect */}
            <div className="absolute top-0 left-28 w-4 h-2 bg-gray-50 dark:bg-gray-900 rounded-b-full transform -translate-x-1/2 -translate-y-[1px] border-b border-gray-200 dark:border-gray-700"></div>
            <div className="absolute bottom-0 left-28 w-4 h-2 bg-gray-50 dark:bg-gray-900 rounded-t-full transform -translate-x-1/2 translate-y-[1px] border-t border-gray-200 dark:border-gray-700"></div>
        </div>
    );
}
