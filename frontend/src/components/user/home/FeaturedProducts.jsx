import React from 'react';
import { FaStar, FaShoppingCart, FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import { PRODUCTS as products } from "../../../data/product";

import { useNavigate } from 'react-router-dom';

export default function FeaturedProducts() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [favorites, setFavorites] = React.useState(() => {
        const saved = localStorage.getItem('camera_hub_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('camera_hub_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };



    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <section className="py-12 bg-white dark:bg-[#0f1115]">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {t('home.featured_title')}
                    </h2>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FaChevronLeft size={12} />
                        </button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/user/products/${product.id}`)}
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-gray-100 dark:hover:border-gray-800 cursor-pointer"
                        >
                            {/* Badges */}
                            {product.sale && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                                    {product.sale}
                                </span>
                            )}

                            {/* Image Container */}
                            <div className="relative aspect-square mb-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${product.soldOut ? 'opacity-50 grayscale' : ''}`}
                                />
                                {product.soldOut && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                                            {t('home.featured_sold_out')}
                                        </span>
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleFavorite(product.id);
                                    }}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                                    title="Add to favorites"
                                >
                                    {favorites.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <FaStar className="text-[#F59E0B]" />
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                                    <span>({product.reviews} {t('home.featured_reviews')})</span>
                                </div>

                                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 h-10 text-sm group-hover:text-[#F59E0B] transition-colors">
                                    {product.name}
                                </h3>

                                <div className="flex items-end justify-between pt-2">
                                    <div className="flex flex-col">
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through font-medium">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                        <span className="text-[#F59E0B] font-bold text-base">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>

                                    <button
                                        disabled={product.soldOut}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/user/products/${product.id}`);
                                        }}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${product.soldOut ? 'bg-gray-100 dark:bg-gray-800 text-gray-300 cursor-not-allowed' : 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1'}`}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
