import React from 'react';
import { FaStore, FaTruck } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function OrderCard({ order, formatPrice }) {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Shop Header */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <FaStore className="text-gray-400" />
                    <span>{order.shopName}</span>
                </div>
                <span className={`text-sm font-bold uppercase ${order.status === 'pending' ? 'text-[#F59E0B]' :
                        order.status === 'pickup' ? 'text-blue-500' :
                            order.status === 'shipping' ? 'text-blue-500' :
                                order.status === 'delivered' ? 'text-green-500' :
                                    order.status === 'returned' ? 'text-red-500' :
                                        'text-gray-400'
                    }`}>
                    {t(`profile.status.${order.status}`)}
                </span>
            </div>

            {/* Product List */}
            <div className="space-y-4 mb-4">
                {order.products.map((product, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg p-1 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</h4>
                            <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded w-fit mt-1">
                                {product.variant}
                            </div>
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500">x{product.quantity}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            {product.originalPrice && (
                                <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
                            )}
                            <div className="text-[#F59E0B] font-medium">{formatPrice(product.price)}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Info */}
            <div className="flex justify-end items-center gap-4 py-4 border-t border-b border-gray-100 dark:border-gray-800 mb-4 bg-gray-50/50 dark:bg-gray-800/30 -mx-6 px-6">
                <span className="text-sm text-gray-500">{t('profile.total')}:</span>
                <span className="text-xl font-bold text-[#F59E0B]">{formatPrice(order.total)}</span>
            </div>

            {/* Shipping info if applicable */}
            {order.deliveryStatus && (
                <div className="mb-4 text-sm text-blue-500 flex items-start gap-2 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                    <FaTruck className="mt-1" />
                    <div>
                        <div className="font-medium">{order.deliveryStatus}</div>
                        <div className="text-gray-500 text-xs mt-1">{order.deliveryDetail}</div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {order.status === 'pending' && (
                    <>
                        <button className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                            {t('profile.actions.cancel')}
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold shadow-lg shadow-orange-500/25 transition-colors">
                            {t('profile.actions.pay')}
                        </button>
                    </>
                )}
                {order.status === 'pickup' && (
                    <button className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                        {t('profile.actions.cancel')}
                    </button>
                )}
                {order.status === 'shipping' && (
                    <>
                        <button className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                            {t('profile.actions.received')}
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-colors">
                            {t('profile.actions.track')}
                        </button>
                    </>
                )}
                {order.status === 'delivered' && (
                    <>
                        <button className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                            {t('profile.actions.return')}
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold shadow-lg shadow-orange-500/25 transition-colors">
                            {t('profile.actions.review')}
                        </button>
                    </>
                )}
                {(order.status === 'cancelled' || order.status === 'returned') && (
                    <button className="px-6 py-2 rounded-lg border border-[#F59E0B] text-[#F59E0B] hover:bg-orange-50 dark:hover:bg-orange-900/10 text-sm font-bold transition-colors w-full">
                        {t('profile.actions.buyAgain')}
                    </button>
                )}
            </div>
        </div>
    );
}
