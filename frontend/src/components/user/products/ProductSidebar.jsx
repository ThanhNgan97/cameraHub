import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaCheck } from 'react-icons/fa';

export default function ProductSidebar({ filters, onFilterChange }) {
    const { t } = useLanguage();
    const [minPrice, setMinPrice] = useState(filters.priceRange.min);
    const [maxPrice, setMaxPrice] = useState(filters.priceRange.max);

    useEffect(() => {
        setMinPrice(filters.priceRange.min);
        setMaxPrice(filters.priceRange.max);
    }, [filters.priceRange]);

    const brands = [
        { id: 'sony', label: 'Sony' },
        { id: 'canon', label: 'Canon' },
        { id: 'nikon', label: 'Nikon' },
        { id: 'fujifilm', label: 'Fujifilm' },
        { id: 'sigma', label: 'Sigma' },
        { id: 'benro', label: 'Benro' },
        { id: 'panasonic', label: 'Panasonic' },
        { id: 'olympus', label: 'Olympus' },
    ];

    const resolutions = [
        { id: '10-20mp', label: '10MP - 20MP' },   
        { id: '20-30mp', label: '20MP - 30MP' },   
        { id: '30-40mp', label: '30MP - 40MP' },   
        { id: '40-50mp', label: '40MP - 50MP' },   
        { id: '60mp+', label: '60MP+' },           
    ];

    const conditions = [
        { id: 'new', label: t('products.condition_new') },
        { id: 'used', label: t('products.condition_used') },
    ];

    return (
        <aside className="w-full lg:w-64 space-y-8 pr-0 lg:pr-8 border-r border-transparent lg:border-gray-100 dark:lg:border-gray-800">
            {/* Brands */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    {t('products.filter_brand')}
                </h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.brands.includes(brand.id) ? 'bg-[#F59E0B] border-[#F59E0B] text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 group-hover:border-[#F59E0B]'}`}>
                                {filters.brands.includes(brand.id) && <FaCheck size={10} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.brands.includes(brand.id)}
                                onChange={() => onFilterChange('brands', brand.id)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                {brand.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    Màu sắc
                </h3>
                <div className="space-y-2">
                    {[
                        { id: 'black', label: 'Đen' },
                        { id: 'white', label: 'Trắng' },
                        { id: 'gray', label: 'Xám' },
                    ].map((color) => (
                        <label key={color.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.colors?.includes(color.id) ? 'bg-[#F59E0B] border-[#F59E0B] text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 group-hover:border-[#F59E0B]'}`}>
                                {filters.colors?.includes(color.id) && <FaCheck size={10} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.colors?.includes(color.id)}
                                onChange={() => onFilterChange('colors', color.id)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                {color.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('products.filter_price')}</h4>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        onBlur={() => onFilterChange('priceRange', { ...filters.priceRange, min: minPrice })}
                        onKeyDown={(e) => e.key === 'Enter' && onFilterChange('priceRange', { ...filters.priceRange, min: minPrice })}
                        className="w-full rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                    />

                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onBlur={() => onFilterChange('priceRange', { ...filters.priceRange, max: maxPrice })}
                        onKeyDown={(e) => e.key === 'Enter' && onFilterChange('priceRange', { ...filters.priceRange, max: maxPrice })}
                        className="w-full rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                    />
                </div>
            </div>

            {/* Resolution */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    {t('products.filter_resolution')}
                </h3>
                <div className="space-y-2">
                    {resolutions.map((res) => (
                        <label key={res.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.resolutions.includes(res.id) ? 'bg-[#F59E0B] border-[#F59E0B] text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 group-hover:border-[#F59E0B]'}`}>
                                {filters.resolutions.includes(res.id) && <FaCheck size={10} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.resolutions.includes(res.id)}
                                onChange={() => onFilterChange('resolutions', res.id)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                {res.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Condition */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                    {t('products.filter_condition')}
                </h3>
                <div className="space-y-2">
                    {conditions.map((cond) => (
                        <label key={cond.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.conditions.includes(cond.id) ? 'bg-[#F59E0B] border-[#F59E0B] text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 group-hover:border-[#F59E0B]'}`}>
                                {filters.conditions.includes(cond.id) && <FaCheck size={10} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.conditions.includes(cond.id)}
                                onChange={() => onFilterChange('conditions', cond.id)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                {cond.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
