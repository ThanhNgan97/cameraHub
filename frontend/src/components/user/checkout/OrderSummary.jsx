import { FaLock } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function OrderSummary({ cartItems = [], subtotal = 0, shipping = 0, onConfirm }) {
    const { t } = useLanguage();
    const total = subtotal + shipping;

    // Use cartItems directly
    const displayItems = cartItems;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('checkout.orderSummary')}</h3>

            {/* Product List */}
            <div className="space-y-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                {displayItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-1 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 pr-4">{item.name}</h4>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price)}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{t('checkout.quantity')}: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('checkout.tempCalc')} ({displayItems.length} {t('checkout.items')})</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('checkout.shippingFee')}</span>
                    <span className="font-bold text-green-500">{t('checkout.free')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('checkout.vat')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{t('checkout.vatIncluded')}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-900 dark:text-white text-lg">{t('checkout.total')}</span>
                <div className="text-right">
                    <div className="text-2xl font-bold text-[#F59E0B]">
                        {formatPrice(total)}
                    </div>
                    <div className="text-[10px] text-gray-400">
                        {t('checkout.vatIncludedNote')}
                    </div>
                </div>
            </div>

            <button
                onClick={onConfirm}
                className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl shadow-lg shadow-orange-500/25 transition-all font-bold uppercase tracking-wide text-sm mb-4"
            >
                {t('checkout.confirmOrder')}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaLock size={10} />
                <span>{t('checkout.secureInfo')}</span>
            </div>
        </div>
    );
}
