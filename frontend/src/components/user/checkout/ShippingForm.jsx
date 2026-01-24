import { FaTruck } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function ShippingForm({
    cities = [],
    districts = [],
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict
}) {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#F59E0B] text-xl"><FaTruck /></span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('checkout.shippingInfo')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.fullName')}</label>
                    <input
                        type="text"
                        placeholder={t('checkout.fullNamePlaceholder')}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.phone')}</label>
                    <input
                        type="text"
                        placeholder={t('checkout.phonePlaceholder')}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-1 mb-4">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.email')}</label>
                <input
                    type="email"
                    placeholder={t('checkout.emailPlaceholder')}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors"
                />
            </div>

            <div className="space-y-1 mb-4">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.address')}</label>
                <input
                    type="text"
                    placeholder={t('checkout.addressPlaceholder')}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.city')}</label>
                    <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors cursor-pointer appearance-none"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="" disabled>{t('checkout.selectCity')}</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.district')}</label>
                    <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors cursor-pointer appearance-none"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedCity}
                    >
                        <option value="" disabled>{t('checkout.selectDistrict')}</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{t('checkout.note')}</label>
                <textarea
                    placeholder={t('checkout.notePlaceholder')}
                    rows="2"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-[#F59E0B] dark:text-white transition-colors resize-none"
                ></textarea>
            </div>
        </div>
    );
}
