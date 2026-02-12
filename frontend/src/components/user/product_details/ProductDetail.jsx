import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { MOCK_PRODUCTS } from '../../../data/mockProducts';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ServicePolicies from './ServicePolicies';
import ProductTabs from './ProductTabs';
import SimilarProducts from './SimilarProducts';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    // Find product based on ID
    useEffect(() => {
        const found = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
        console.log('ProductDetail - Found product ID:', id, '| Has specs:', !!found?.specs);
        if (found) {
            setProduct(found);
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <IoIosArrowBack size={24} />
                    </button>
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 lg:p-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Images */}
                        <ProductGallery product={product} />

                        {/* Right: Info */}
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Policies Section */}
                <ServicePolicies />

                {/* Tabs & Content */}
                <ProductTabs product={product} />

                {/* Similar Products */}
                <SimilarProducts product={product} />
            </main>

            <Footer />
        </div>
    );
}
