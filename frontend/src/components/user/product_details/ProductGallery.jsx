import React, { useState } from 'react';
import { FaRegHeart, FaPlay } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function ProductGallery({ product }) {
    const [activeImage, setActiveImage] = useState(0);
    const { t } = useLanguage();

    const thumbnails = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center group">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{t("productDetail.newArrival")}</span>
                    {product.sale && (
                        <span className="bg-[#EF4444] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{product.sale} {t("productDetail.off")}</span>
                    )}
                </div>

                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors z-10">
                    <FaRegHeart size={20} />
                </button>

                <img
                    src={thumbnails[activeImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {thumbnails.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-20 h-20 flex-shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 flex items-center justify-center cursor-pointer overflow-hidden ${activeImage === idx ? 'border-[#F59E0B]' : 'border-transparent'}`}
                    >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover p-2" />
                    </div>
                ))}
                {/* Video Thumbnail Placeholder */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gray-50 dark:bg-gray-800 border-transparent border-2 flex items-center justify-center cursor-pointer text-gray-400 hover:text-[#F59E0B] transition-colors">
                    <FaPlay />
                </div>
            </div>
        </div>
    );
}
