import React, { useState } from 'react';
import SpecsTable from './SpecsTable';
import FeaturedReviews from './FeaturedReviews';
import { useLanguage } from '../../../context/LanguageContext';

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState('specs');
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm overflow-hidden">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
                {['specs', 'description', 'reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? 'text-[#F59E0B]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
                    >
                        {tab === 'specs' && t("productDetail.specs")}
                        {/* {tab === 'description' && t("productDetail.description")}
                        {tab === 'reviews' && `${t("productDetail.customerReviews")} (128)`} */}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F59E0B]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
                {activeTab === 'specs' && (
                    <div className="space-y-12">
                        <SpecsTable product={product} />
                        <FeaturedReviews />
                    </div>
                )}
                {activeTab === 'description' && (
                    <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed min-h-[300px]">
                        <p>{t("productDetail.updatingDesc")}</p>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="min-h-[300px]">
                        <p className="text-gray-600 dark:text-gray-300">{t("productDetail.viewAllReviews")}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
