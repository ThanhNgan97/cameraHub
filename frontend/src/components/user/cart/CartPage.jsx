import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import CartItem from './CartItem';

import CartSummary from './CartSummary';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import { useLanguage } from '../../../context/LanguageContext';

export default function CartPage() {
    const { cartItems, updateQuantity, toggleSelect, selectAll, removeItem } = useCart();
    const navigate = useNavigate();


    const { t } = useLanguage();

    // Calculate totals
    const selectedItems = cartItems.filter(item => item.selected);
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = selectedItems.length > 0 ? 35000 : 0;
    const discount = selectedItems.length > 0 ? 500000 : 0; // Mock voucher discount

    // Group items by seller
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.seller]) acc[item.seller] = [];
        acc[item.seller].push(item);
        return acc;
    }, {});

    const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300 flex flex-col">
                <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                        <NavbarActions className="w-full justify-between" />
                    </div>
                </div>

                <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-48 h-48 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-6xl text-gray-300 dark:text-gray-600">
                        🛒
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("cart.emptyCart")}</h2>
                    <p className="text-gray-500 mb-8 text-center max-w-md">{t("cart.emptyCartDesc")}</p>
                    <Link to="/user/products" className="px-8 py-3 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-[#D97706] transition-colors shadow-lg shadow-orange-500/25">
                        {t("cart.continueShopping")}
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("cart.yourCart")}</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Cart Items */}
                    <div className="flex-1 space-y-6">
                        {/* Select All Header */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={(e) => selectAll(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-[#F59E0B] focus:ring-[#F59E0B]"
                                />
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {t("cart.selectAll")} ({cartItems.length} {t("cart.items")})
                                </span>
                            </label>
                            <button className="flex items-center gap-1 text-[#EF4444] text-sm hover:underline">
                                <FaTrash /> {t("cart.delete")}
                            </button>
                        </div>

                        {/* Grouped Items */}
                        {/* Grouped Items */}
                        {Object.entries(groupedItems).map(([seller, items]) => (
                            <div key={seller} className="space-y-4">
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-sm">{t("cart.soldBy")}</span>
                                        <span className="font-bold text-[#F59E0B] text-sm">{seller}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl px-4 shadow-sm border border-gray-100 dark:border-gray-800">
                                            <CartItem
                                                item={item}
                                                onUpdateQuantity={updateQuantity}
                                                onToggleSelect={toggleSelect}
                                                onRemove={removeItem}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}


                    </div>

                    {/* Right Column: Summary */}
                    <div className="w-full lg:w-96">
                        <CartSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            discount={discount}
                            onCheckout={() => navigate('/user/checkout')}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
