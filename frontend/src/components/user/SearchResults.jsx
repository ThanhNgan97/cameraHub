import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NavbarActions from '../common/NavbarActions';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/users/products/search?search=${query || ''}&limit=50`);
                const data = await response.json();
                if (data.data) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        } else {
            setProducts([]); // Clear results if no query
            setLoading(false);
        }
    }, [query]);

    // Format currency helper
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto py-16 px-4 lg:px-8 space-y-8 min-h-[60vh]">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    {t('products.found')} <span className="text-primary">{products.length}</span> {t('products.results')} "{query}"
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-50 dark:bg-gray-900">
                                        {product.discount_price && (
                                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                                Offer
                                            </span>
                                        )}
                                        <div
                                            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                            style={{
                                                backgroundImage: `url('${product.product_images && product.product_images.length > 0 ? product.product_images[0].image_url : 'https://via.placeholder.com/300'}')`,
                                            }}
                                        ></div>
                                    </div>
                                    <h3 className="text-lg font-bold truncate mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        {product.category || product.brand}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-primary font-bold text-xl">{formatPrice(product.price)}</p>
                                        </div>
                                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                                            <span className="material-symbols-outlined text-xl">
                                                add_shopping_cart
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No products found matching your search.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
