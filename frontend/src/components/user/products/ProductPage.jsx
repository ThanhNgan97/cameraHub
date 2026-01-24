import { useState, useMemo, useEffect } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import ProductSidebar from './ProductSidebar';
import ProductGrid from './ProductGrid';
import { MOCK_PRODUCTS } from '../../../data/mockProducts';

const ITEMS_PER_PAGE = 16;

export default function ProductPage() {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        brands: [],
        resolutions: [],
        conditions: [],
        colors: [],
        priceRange: { min: '', max: '' }
    });

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy]);

    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            if (type === 'priceRange') {
                return { ...prev, priceRange: value };
            }

            const current = prev[type];
            return {
                ...prev,
                [type]: current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value]
            };
        });
    };

    const filteredProducts = useMemo(() => {
        let result = [...MOCK_PRODUCTS];

        // Filter by Brand
        if (filters.brands.length > 0) {
            result = result.filter(product =>
                filters.brands.includes(product.brand)
            );
        }

        // Filter by Condition
        if (filters.conditions.length > 0) {
            result = result.filter(product =>
                filters.conditions.includes(product.condition)
            );
        }

        // Filter by Resolution
        if (filters.resolutions.length > 0) {
            result = result.filter(product => {
                if (!product.resolution) return false;
                return filters.resolutions.some(range => {
                    if (range === '10-20mp') return product.resolution >= 10 && product.resolution <= 20;
                    if (range === '20-30mp') return product.resolution >= 20 && product.resolution <= 30;
                    if (range === '30-40mp') return product.resolution > 30 && product.resolution <= 40;
                    if (range === '40-50mp') return product.resolution > 40 && product.resolution <= 50;
                    if (range === '30-50mp') return product.resolution > 30 && product.resolution <= 50; // Keep backward compatibility just in case
                    if (range === '60mp+') return product.resolution >= 60;
                    return false;
                });
            });
        }

        // Filter by Price
        if (filters.priceRange.min !== '') {
            result = result.filter(product => product.price >= Number(filters.priceRange.min));
        }
        if (filters.priceRange.max !== '') {
            result = result.filter(product => product.price <= Number(filters.priceRange.max));
        }

        // Filter by Color
        if (filters.colors.length > 0) {
            result = result.filter(product =>
                product.color && filters.colors.includes(product.color)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
            default:
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [filters, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <ProductSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Product Grid */}
                    <ProductGrid
                        products={paginatedProducts}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredProducts.length}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
