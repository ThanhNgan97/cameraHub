import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function SpecsTable() {
    const { t } = useLanguage();

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.detailedSpecs")}</h3>
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        <tr className="bg-white dark:bg-gray-900">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400 w-1/3">{t("productDetail.sensor")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">Full-frame Exmor R CMOS 33.0 MP</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.processor")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">BIONZ XR + AI Processing Unit</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-900">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.iso")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">100 - 51200 (Mở rộng 50 - 204800)</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.focusPoints")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">759 điểm lấy nét theo pha, Real-time Eye AF</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-900">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.video")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">4K 60p 10-bit 4:2:2, S-Cinetone</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.screen")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">LCD 3.0 inch xoay lật cảm ứng (1.03 triệu điểm ảnh)</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-900">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.viewfinder")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">EVF OLED 3.69 triệu điểm ảnh, phóng đại 0.78x</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <td className="p-4 font-semibold text-gray-600 dark:text-gray-400">{t("productDetail.battery")}</td>
                            <td className="p-4 text-gray-900 dark:text-white">NP-FZ100 (Chụp khoảng 580 tấm)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="mt-4 flex items-center gap-2 text-[#F59E0B] font-bold text-sm hover:text-[#D97706] transition-colors">
                {t("productDetail.viewFullSpecs")}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}
