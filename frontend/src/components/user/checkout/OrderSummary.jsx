import { FaLock, FaTicketAlt, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import { useState } from 'react';
import VoucherModal from '../voucher/VoucherModal';

export default function OrderSummary({ cartItems = [], subtotal = 0, shipping = 0, onConfirm }) {
    const { t } = useLanguage();
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    // Calculate total with discount if any (simplified)
    const discount = selectedVoucher ? 500000 : 0; // Mock logic - in real app this depends on voucher type
    const total = subtotal + shipping - discount;

    // Use cartItems directly
    const displayItems = cartItems;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleSelectVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        // In a real app, you would validate the voucher here or in the parent
    };

    const VoucherSection = ({ title, placeholder }) => (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-[#d97706]"><FaTicketAlt /></span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{title}</span>
            </div>

            {selectedVoucher ? (
                <div className="flex gap-2 mb-2 items-center bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                    <span className="text-[#d97706] text-sm font-bold flex-1 line-clamp-1">{selectedVoucher.title}</span>
                    <button onClick={() => setSelectedVoucher(null)} className="text-gray-400 hover:text-gray-600 p-1"><FaTimes /></button>
                </div>
            ) : (
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder={placeholder}
                        readOnly
                        onClick={() => setShowVoucherModal(true)}
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d97706] cursor-pointer"
                    />
                    <button
                        onClick={() => setShowVoucherModal(true)}
                        className="bg-[#fff7ed] hover:bg-[#ffedd5] text-[#d97706] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#d97706]/20"
                    >
                        {t('checkout.apply')}
                    </button>
                </div>
            )}

            <div
                className="flex items-center justify-between text-xs text-[#d97706] cursor-pointer hover:text-[#b45309]"
                onClick={() => setShowVoucherModal(true)}
            >
                <div className="flex items-center gap-1">
                    <FaTicketAlt className="transform -rotate-45" />
                    <span>{t('checkout.selectVoucher')}</span>
                </div>
                <FaChevronRight size={10} />
            </div>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">

            {/* Voucher Sections */}
            <VoucherSection
                title={t('checkout.shopVoucher')}
                placeholder={t('checkout.enterCode')}
            />

            <div className="border-b border-gray-100 dark:border-gray-800 mb-6"></div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('checkout.orderSummary')}</h3>

            {/* Product List */}
            <div className="space-y-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                {displayItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-md p-1 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1" title={item.name}>
                                {item.name}
                            </h4>
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                                <span className="text-xs text-gray-500">{t('checkout.quantity')}: {item.quantity}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{t('checkout.tempCalc')} ({displayItems.length} {t('checkout.items')})</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{t('checkout.shippingFee')}</span>
                    <span className="font-bold text-green-500">{t('checkout.free')}</span>
                </div>
                {selectedVoucher && (
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Voucher giảm giá</span>
                        <span className="font-medium text-[#d97706]">- {formatPrice(discount)}</span>
                    </div>
                )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-end mb-6">
                <span className="font-bold text-gray-900 dark:text-white text-base">{t('checkout.total')}</span>
                <div className="text-right">
                    <div className="text-xl font-bold text-[#d97706]">
                        {formatPrice(total)}
                    </div>
                    <div className="text-[11px] text-gray-400">
                        {t('checkout.vatIncludedNote')}
                    </div>
                </div>
            </div>

            <button
                onClick={onConfirm}
                className="w-full py-3.5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-lg shadow-md shadow-orange-500/20 transition-all font-bold uppercase tracking-wide text-sm mb-4 active:scale-[0.98]"
            >
                {t('checkout.confirmOrder')}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 rounded">
                <FaLock size={10} />
                <span>{t('checkout.secureInfo')}</span>
            </div>

            <VoucherModal
                isOpen={showVoucherModal}
                onClose={() => setShowVoucherModal(false)}
                onSelectVoucher={handleSelectVoucher}
            />
        </div>
    );
}
