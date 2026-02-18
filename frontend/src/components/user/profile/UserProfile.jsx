import React, { useState } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import OrderTabs from './OrderTabs';
import OrderCard from './OrderCard';
import UserInfo from './UserInfo';

import { useLocation } from 'react-router-dom';

export default function UserProfile() {
    const { t } = useLanguage();
    const location = useLocation();
    // Force HMR update
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'all');

    const tabs = [
        { id: 'all', label: t('profile.tabs.all') },
        { id: 'pending', label: t('profile.tabs.pending') },
        { id: 'pickup', label: t('profile.tabs.pickup') },
        { id: 'shipping', label: t('profile.tabs.shipping') },
        { id: 'delivered', label: t('profile.tabs.delivered') },
        { id: 'returned', label: t('profile.tabs.returned') },
        { id: 'cancelled', label: t('profile.tabs.cancelled') },
    ];

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await import('../../../services/orderService').then(m => m.default.getUserOrders());
                if (response.success) {
                    setOrders(response.orders);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(order => order.status === activeTab);

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
