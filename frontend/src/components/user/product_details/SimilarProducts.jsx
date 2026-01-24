import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../../data/mockProducts';
import { useLanguage } from '../../../context/LanguageContext';

export default function SimilarProducts({ product }) {
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    const formatPrice = (price) => {
        return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(price);
    };

    const similarProducts = useMemo(() => {
        if (!product) return [];

        const getCategory = (item) => {
            if (item.resolution > 0) return 'camera';
            if (item && item.name && item.name.match(/(mm|f\/)/i)) return 'lens';
            return 'other';
        };

        const currentCategory = getCategory(product);

        // Filter and ensure we don't include the current product
        return MOCK_PRODUCTS.filter(p =>
            p.id !== product.id &&
            getCategory(p) === currentCategory
        ).slice(0, 4);
    }, [product]);

    if (!similarProducts || similarProducts.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.similarProducts")}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((prod) => (
                    <div
                        key={prod.id}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 group"
                        onClick={() => {
                            navigate(`/user/products/${prod.id}`);
                            window.scrollTo(0, 0); // Scroll to top on navigation
                        }}
                    >
                        <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                            <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1 group-hover:text-[#F59E0B] transition-colors">
                            {prod.name}
                        </h4>
                        <span className="text-[#F59E0B] font-bold text-sm">
                            {formatPrice(prod.price)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
