import React, { useState } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import OrderTabs from './OrderTabs';
import OrderCard from './OrderCard';
import UserInfo from './UserInfo';

export default function UserProfile() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: t('profile.tabs.all') },
        { id: 'pending', label: t('profile.tabs.pending') },
        { id: 'shipping', label: t('profile.tabs.shipping') },
        { id: 'completed', label: t('profile.tabs.completed') },
        { id: 'cancelled', label: t('profile.tabs.cancelled') },
    ];

    // Mock Orders Data based on the image provided
    const mockOrders = [
        {
            id: 1,
            shopName: "CameraHub Official",
            status: "pending",
            statusLabel: "CHỜ THANH TOÁN",
            products: [
                {
                    name: "Sony Alpha A7 V Body Only - Fullframe Mirrorless",
                    variant: "Body Only",
                    quantity: 1,
                    originalPrice: 65000000,
                    price: 58500000,
                    image: "https://hnsfpau.imgix.net/5/images/detailed/235/ILCE7RM5B.01.jpg?fit=fill&bg=0FFF&w=1500&h=844&auto=format,compress"
                }
            ],
            total: 58500000,
            image: "https://binhminhdigital.com/StoreData/images/Product/sony-alpha-a7-iv-body.jpg"
        },
        {
            id: 2,
            shopName: "Lens Master",
            status: "shipping",
            statusLabel: "ĐANG GIAO",
            products: [
                {
                    name: "Canon EOS R6 Mark II Body - Quay 4K60p",
                    variant: "Đen",
                    quantity: 1,
                    price: 55990000,
                    image: "https://binhminhdigital.com/storedata/images/product/may-anh-canon-eos-r6-mark-ii-lens-24105mm-f4-l.jpg"
                }
            ],
            total: 55990000,
            deliveryStatus: "Đơn hàng đang được vận chuyển",
            deliveryDetail: "Đã đến kho SOC Hà Nội - Dự kiến giao 20/10"
        },
        {
            id: 3,
            shopName: "Nikon Official Store",
            status: "completed",
            statusLabel: "HOÀN THÀNH",
            products: [
                {
                    name: "Nikon Z6 II Body - Mirrorless Fullframe",
                    variant: "Body",
                    quantity: 1,
                    price: 32990000,
                    image: "https://bizweb.dktcdn.net/100/107/650/products/gopro-hero-11-1-500x500.jpg?v=1686216361367"
                }
            ],
            total: 32990000
        },

    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const filteredOrders = activeTab === 'all'
        ? mockOrders
        : mockOrders.filter(order => order.status === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[800px] mx-auto px-4 lg:px-8 py-8">
                {/* User Info Header */}
                <UserInfo />

                {/* Tabs */}
                <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <OrderCard key={order.id} order={order} formatPrice={formatPrice} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
