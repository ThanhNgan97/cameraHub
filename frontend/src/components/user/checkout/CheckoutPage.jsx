import { useState, useMemo, useEffect } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import ShippingForm from './ShippingForm';
import PaymentSection from './PaymentSection';
import OrderSummary from './OrderSummary';
import { vietnamLocations } from '../../../i18n/vietnam_locations';

export default function CheckoutPage() {
    const { t } = useLanguage();
    const { cartItems } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Location state
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);

    // Update districts when city changes
    useEffect(() => {
        if (selectedCity) {
            const cityData = vietnamLocations.find(c => c.name === selectedCity);
            setAvailableDistricts(cityData ? cityData.districts : []);
            setSelectedDistrict(''); // Reset district
        } else {
            setAvailableDistricts([]);
            setSelectedDistrict('');
        }
    }, [selectedCity]);

    const handleConfirmOrder = () => {
        alert("Đặt hàng thành công!");
    };

    // Calculate totals from selected items in cart
    const selectedItems = useMemo(() => cartItems.filter(item => item.selected), [cartItems]);
    const subtotal = useMemo(() => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [selectedItems]);
    const shipping = selectedItems.length > 0 ? 0 : 0; // Free shipping logic or inherited

    // Get list of city names
    const cities = vietnamLocations.map(location => location.name);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('checkout.title')}</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Forms */}
                    <div className="flex-1 space-y-6">
                        {/* Shipping Info */}
                        <ShippingForm
                            cities={cities}
                            districts={availableDistricts}
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}
                        />

                        {/* Payment Methods */}
                        <PaymentSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[480px]">
                        <OrderSummary
                            cartItems={selectedItems}
                            subtotal={subtotal}
                            shipping={shipping}
                            onConfirm={handleConfirmOrder}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
