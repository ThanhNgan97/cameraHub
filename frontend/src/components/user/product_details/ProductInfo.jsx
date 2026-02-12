import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCartPlus, FaCheck } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import { useLanguage } from '../../../context/LanguageContext';
import { MOCK_PRODUCTS } from '../../../data/mockProducts';

export default function ProductInfo({ product }) {
    const [selectedConfig, setSelectedConfig] = useState('base'); // 'base' or 'kit'
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart, buyNow } = useCart();
    const { t, language } = useLanguage();

    const navigate = useNavigate();

    // 1. Dynamic Recommendation (Fallback)
    const recommendation = useMemo(() => {
        if (!product.brand || product.kit) return null; // Skip if explicit kit exists

        const targetCategory = product.category === 'camera' ? 'lens' : 'camera';
        return MOCK_PRODUCTS.find(p =>
            p.brand === product.brand &&
            p.category === targetCategory &&
            p.id !== product.id
        );
    }, [product]);

    // 2. Resolve Kit Data (Explicit Kit > Dynamic Recommendation)
    const kitData = useMemo(() => {
        if (product.kit) {
            return {
                name: product.kit.name,
                price: product.kit.price, // Explicit price from data
                desc: t("productDetail.kitDesc") || "Bộ lens kit đi kèm"
            };
        }
        if (recommendation) {
            return {
                name: `Bundle w/ ${recommendation.name}`,
                price: product.price + recommendation.price,
                desc: t("productDetail.bundleCameraDesc") || "Gợi ý mua kèm"
            };
        }
        return null;
    }, [product, recommendation, t]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleAddToCart = () => {
        let configName = 'Standard';
        if (selectedConfig === 'base') {
            configName = product.category === 'camera' ? 'Body Only' : (product.category === 'lens' ? 'Lens Only' : 'Standard');
        } else if (selectedConfig === 'kit' && kitData) {
            configName = kitData.name;
        }

        addToCart(product, configName);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            navigate('/user/cart');
        }, 1000);
    };

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        addToCart(product, selectedConfig === 'base' ? 'Body Only' : kitData?.name || 'Bundle');
        alert(t("productDetail.addToCartSuccess"));
    };

    const handleBuyNow = () => {
        buyNow(product, selectedConfig === 'base' ? 'Body Only' : kitData?.name || 'Bundle');
        navigate('/user/checkout');
    };

    // Calculate display price
    const currentPrice = selectedConfig === 'kit' && kitData ? kitData.price : product.price;

    return (
        <div className="flex flex-col">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-[#F59E0B] text-sm">
                        <FaStar />
                        <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">| {product.reviews} {t("productDetail.reviews")}</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#F59E0B]">
                        {formatPrice(currentPrice)}
                    </span>
                    {product.originalPrice && selectedConfig === 'base' && (
                        <span className="text-lg text-gray-400 line-through decoration-gray-400/50">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>
                <div
                    onClick={handleQuickAdd}
                    className="mt-4 flex items-center gap-2 text-[#22C55E] text-sm font-medium cursor-pointer hover:text-[#16a34a] transition-colors w-fit"
                    title={t("productDetail.addToCartTitle")}
                >
                    <FaCheck size={12} />
                    <span>{t("productDetail.inStock")}</span>
                </div>
            </div>

            {/* Configuration */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{t("productDetail.selectConfig")}</h3>
                <div className="space-y-3">
                    {/* Option 1: Base (Body Only / Lens Only) */}
                    <label
                        className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedConfig === 'base' ? 'border-[#F59E0B] bg-[#FFF8ED] dark:bg-[#F59E0B]/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                        onClick={() => setSelectedConfig('base')}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedConfig === 'base' ? 'border-[#F59E0B]' : 'border-gray-300'}`}>
                                {selectedConfig === 'base' && <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 dark:text-white text-sm">
                                    {product.category === 'lens' ? 'Lens Only' : 'Body Only'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {product.category === 'lens' ? (t("productDetail.lensOnlyDesc") || "Chỉ ống kính") : (t("productDetail.bodyDesc") || "Chỉ thân máy")}
                                </div>
                            </div>
                        </div>
                        <span className="font-bold text-[#F59E0B] text-sm">{formatPrice(product.price)}</span>
                    </label>

                    {/* Option 2: Kit / Bundle */}
                    {kitData && (
                        <label
                            className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedConfig === 'kit' ? 'border-[#F59E0B] bg-[#FFF8ED] dark:bg-[#F59E0B]/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                            onClick={() => setSelectedConfig('kit')}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedConfig === 'kit' ? 'border-[#F59E0B]' : 'border-gray-300'}`}>
                                    {selectedConfig === 'kit' && <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{kitData.name}</div>
                                    <div className="text-xs text-gray-500">{kitData.desc}</div>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-sm whitespace-nowrap ml-2">{formatPrice(kitData.price)}</span>
                        </label>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex items-stretch gap-4">
                <button
                    onClick={handleAddToCart}
                    className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${isAdded
                        ? 'border-[#F59E0B] text-[#F59E0B] bg-orange-50 dark:bg-orange-900/10'
                        : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-[#F59E0B] hover:text-[#F59E0B]'
                        }`}
                >
                    {isAdded ? <FaCheck size={20} /> : <FaCartPlus size={20} />}
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl flex flex-col items-center justify-center transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                    <span className="text-sm border-gray-200 font-black uppercase">{t("productDetail.buyNow")}</span>
                    <span className="text-[10px] font-medium opacity-90">{t("productDetail.deliveryDesc")}</span>
                </button>
            </div>
        </div>
    );
}
