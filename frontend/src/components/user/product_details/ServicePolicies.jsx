import React from 'react';
import { FaShieldAlt, FaExchangeAlt, FaTruck, FaCreditCard } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function ServicePolicies() {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-12">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t("productDetail.genuineWarranty")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t("productDetail.warrantyDesc")}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <FaExchangeAlt size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t("productDetail.freeReturn")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t("productDetail.returnDesc")}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <FaTruck size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t("productDetail.freeShipping")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t("productDetail.shippingDesc")}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <FaCreditCard size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t("productDetail.installment")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t("productDetail.installmentDesc")}</p>
                </div>
            </div>
        </div>
    );
}
