import React from 'react';
import { FaMoneyBillWave, FaQrcode, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function PaymentMethods({ selectedMethod, onSelectMethod }) {
    const { t } = useLanguage();

    const methods = [
        {
            id: 'cod',
            title: t("cart.cod"),
            description: t("cart.codDesc"),
            icon: <FaMoneyBillWave size={20} className="text-[#F59E0B]" />
        },
        {
            id: 'ewallet',
            title: t("cart.ewallet"),
            description: t("cart.ewalletDesc"),
            icon: <FaQrcode size={20} className="text-blue-500" />
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t("cart.paymentMethods")}</h3>
            <div className="space-y-3">
                {methods.map((method) => (
                    <label
                        key={method.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === method.id
                            ? 'border-[#F59E0B] bg-[#FFF8ED] dark:bg-[#F59E0B]/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => onSelectMethod(method.id)}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selectedMethod === method.id ? 'bg-[#F59E0B]/20' : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                            {method.icon}
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-gray-900 dark:text-white text-sm">
                                {method.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {method.description}
                            </div>
                        </div>
                        <div className={`mt-1 ${selectedMethod === method.id ? 'text-[#F59E0B]' : 'text-gray-300'}`}>
                            {selectedMethod === method.id ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
