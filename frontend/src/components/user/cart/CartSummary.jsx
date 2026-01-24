import React, { useState } from 'react';
import { FaTicketAlt, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function CartSummary({ subtotal, shipping, discount, onCheckout }) {
    const [voucher, setVoucher] = useState('');
    const { t, language } = useLanguage();

    const formatPrice = (price) => {
        return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(price);
    };

    const total = subtotal + shipping - discount;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-fit sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t("cart.orderSummary")}</h3>

            {/* Price breakdown */}
            <div className="space-y-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{t("cart.subtotal")}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#EF4444]">
                        <span>Tiết kiệm</span>
                        <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-end mb-6">
                <span className="font-bold text-gray-900 dark:text-white">{t("cart.totalPayment")}</span>
                <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-[#F59E0B]">
                        {formatPrice(total)}
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={onCheckout}
                className="w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wide"
            >
                {t("cart.checkoutNow")}
                <FaCheckCircle />
            </button>
        </div>
    );
}
