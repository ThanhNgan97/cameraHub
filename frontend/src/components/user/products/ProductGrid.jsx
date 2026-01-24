import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThLarge, FaList, FaShoppingCart, FaHeart, FaRegHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function ProductGrid({
    products,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    onPageChange,
    totalItems
}) {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Wishlist Persistence
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('camera_hub_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
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
        <div className="flex-1">
            {/* Grid Header */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-500">
                    {t('products.found')} <strong className="text-gray-900 dark:text-white">{totalItems}</strong> {t('products.results')}
                </span>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{t('products.sort_by')}:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 border-none outline-none text-sm text-gray-900 dark:text-white font-medium p-1 rounded cursor-pointer"
                        >
                            <option value="newest">{t('products.sort_newest')}</option>
                            <option value="price_asc">{t('products.sort_price_asc')}</option>
                            <option value="price_desc">{t('products.sort_price_desc')}</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#F59E0B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <FaThLarge />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#F59E0B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <FaList />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products */}
            {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No products found matching your criteria.
                </div>
            ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/user/products/${product.id}`)}
                            className={`group bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-gray-100 dark:hover:border-gray-800 cursor-pointer ${viewMode === 'list' ? 'flex gap-6' : ''}`}
                        >
                            {/* Badges */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {product.sale && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                        {product.sale}
                                    </span>
                                )}
                                {product.condition === 'new' && (
                                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
                                        {t('products.condition_new')}
                                    </span>
                                )}
                                {product.condition === 'used' && (
                                    <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
                                        {t('products.condition_used')}
                                    </span>
                                )}
                                {product.soldOut && (
                                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
                                        {t('home.featured_sold_out')}
                                    </span>
                                )}
                            </div>

                            {/* Image */}
                            <div className={`relative bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center ${viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'aspect-square mb-4'}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${product.soldOut ? 'opacity-50 grayscale' : ''}`}
                                />

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
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                                    <FaStar className="text-[#F59E0B]" />
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                                    <span>({product.reviews} {t('home.featured_reviews')})</span>
                                </div>

                                <h3 className={`font-bold text-gray-900 dark:text-white text-base group-hover:text-[#F59E0B] transition-colors mb-2 ${viewMode === 'grid' ? 'line-clamp-2 h-12' : ''}`}>
                                    {product.name}
                                </h3>

                                <div className={`mt-auto flex items-end justify-between ${viewMode === 'list' ? 'w-full' : ''}`}>
                                    <div className="flex flex-col">
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through font-medium">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                        <span className="text-[#F59E0B] font-bold text-lg">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/user/products/${product.id}`);
                                        }}
                                        disabled={product.soldOut}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${product.soldOut ? 'bg-gray-100 dark:bg-gray-800 text-gray-300 cursor-not-allowed' : 'bg-[#FAFAFA] dark:bg-gray-800 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white shadow-sm'}`}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaChevronLeft size={12} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => onPageChange(i + 1)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${currentPage === i + 1 ? 'bg-[#F59E0B] text-white font-bold shadow-lg shadow-orange-500/20' : 'border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaChevronRight size={12} />
                    </button>
                </div>
            )}
        </div>
    );
}
