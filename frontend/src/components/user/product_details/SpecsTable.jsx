import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function SpecsTable({ product }) {
    const { t } = useLanguage();

    // Comprehensive debug logging
    console.log('=== SpecsTable Debug ===');
    console.log('Product received:', product);
    console.log('Product type:', typeof product);
    console.log('Product is null?', product === null);
    console.log('Product is undefined?', product === undefined);
    console.log('Product.specs:', product?.specs);
    console.log('Product.specs type:', typeof product?.specs);
    console.log('Has specs?:', !!(product && product.specs));
    console.log('Specs keys:', product?.specs ? Object.keys(product.specs) : 'N/A');
    console.log('========================');

    // Early return if no product
    if (!product) {
        console.warn('SpecsTable: No product provided');
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Không tìm thấy sản phẩm</p>
            </div>
        );
    }

    // Early return if no specs
    if (!product.specs) {
        console.warn('SpecsTable: Product has no specs', product);
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>{t("productDetail.specsUpdating") || "Thông số kỹ thuật đang được cập nhật..."}</p>
                <p className="text-xs mt-2">Product ID: {product.id} | Category: {product.category}</p>
            </div>
        );
    }

    const specs = product.specs;
    console.log('SpecsTable: Rendering specs table with data:', specs);

    // Detect if this is a lens or camera based on category
    const isLens = product.category === 'lens';

    // Spec label mapping for cameras
    const cameraLabels = {
        sensor: t("productDetail.sensor") || "Cảm Biến",
        processor: t("productDetail.processor") || "Bộ Xử Lý",
        iso: t("productDetail.iso") || "ISO",
        af: t("productDetail.focusPoints") || "Lấy Nét",
        video: t("productDetail.video") || "Video",
        screen: t("productDetail.screen") || "Màn Hình",
        viewfinder: t("productDetail.viewfinder") || "Kính Ngắm",
        battery: t("productDetail.battery") || "Pin"
    };

    // Spec label mapping for lenses
    const lensLabels = {
        mount: "Ngàm",
        focalLength: "Tiêu Cự",
        aperture: "Khẩu Độ",
        elements: "Cấu Trúc Quang Học",
        autofocus: "Motor Lấy Nét",
        stabilization: "Chống Rung",
        filterSize: "Kích Thước Filter",
        dimensions: "Kích Thước",
        weight: "Trọng Lượng"
    };

    // Choose appropriate labels and order based on product type
    const specLabels = isLens ? lensLabels : cameraLabels;
    const specOrder = isLens
        ? ['mount', 'focalLength', 'aperture', 'elements', 'autofocus', 'stabilization', 'filterSize', 'dimensions', 'weight']
        : ['sensor', 'processor', 'iso', 'af', 'video', 'screen', 'viewfinder', 'battery'];

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                {t("productDetail.detailedSpecs") || "Thông Số Kỹ Thuật Chi Tiết"}
            </h3>
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {specOrder.map((key, index) => {
                            const value = specs[key];
                            if (!value) return null;

                            const isEven = index % 2 === 0;
                            return (
                                <tr
                                    key={key}
                                    className={isEven ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}
                                >
                                    <td className="p-4 font-bold text-gray-500 dark:text-gray-400 w-1/3 uppercase text-xs tracking-wider">
                                        {specLabels[key] || key}
                                    </td>
                                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                                        {value}
                                    </td>
                                </tr>
                            );
                        })}

                        {/* Show any additional specs not in the predefined order */}
                        {Object.entries(specs).map(([key, value], index) => {
                            if (specOrder.includes(key)) return null;

                            const isEven = (specOrder.length + index) % 2 === 0;
                            return (
                                <tr
                                    key={key}
                                    className={isEven ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}
                                >
                                    <td className="p-4 font-bold text-gray-500 dark:text-gray-400 w-1/3 uppercase text-xs tracking-wider">
                                        {key}
                                    </td>
                                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                                        {value}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
