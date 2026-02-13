import { useState, useMemo, useEffect } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import addressService from '../../../services/addressService'; // Import addressService
import ShippingForm from './ShippingForm';
import PaymentSection from './PaymentSection';
import OrderSummary from './OrderSummary';
import AddressCard from './AddressCard';
import { vietnamLocations } from '../../../i18n/vietnam_locations';

export default function CheckoutPage() {
    const { t } = useLanguage();
    const { cartItems } = useCart();
    const { user } = useAuth(); // Get user from context
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Form State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    // Location state
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState(''); // Added Ward
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableWards, setAvailableWards] = useState([]); // Mock wards if needed, or just text input for now

    // Update districts when city changes
    useEffect(() => {
        if (selectedCity) {
            const cityData = vietnamLocations.find(c => c.name === selectedCity);
            setAvailableDistricts(cityData ? cityData.districts : []);
        } else {
            setAvailableDistricts([]);
        }
    }, [selectedCity]);

    // Fetch default address on mount
    useEffect(() => {
        const fetchDefaultAddress = async () => {
            if (!user) return;
            try {
                const response = await addressService.getAddresses();
                if (response.success && response.addresses.length > 0) {
                    const defaultAddr = response.addresses.find(a => a.is_default) || response.addresses[0];

                    setFullName(defaultAddr.full_name || user.full_name || '');
                    setPhone(defaultAddr.phone || user.phone || '');
                    setEmail(defaultAddr.email || user.email || ''); // Assuming address might have email or fallback to user
                    setAddress(defaultAddr.address_detail || '');
                    setSelectedCity(defaultAddr.province || '');
                    setSelectedDistrict(defaultAddr.district || '');
                    setSelectedWard(defaultAddr.ward || '');

                    // Manually set districts for the pre-selected city
                    if (defaultAddr.province) {
                        const cityData = vietnamLocations.find(c => c.name === defaultAddr.province);
                        setAvailableDistricts(cityData ? cityData.districts : []);
                    }
                } else {
                    // Fallback to user profile data if no address found
                    setFullName(user.full_name || '');
                    setPhone(user.phone || '');
                    setEmail(user.email || '');
                }
            } catch (error) {
                console.error("Failed to fetch default address", error);
                // Fallback to user profile data on error
                if (user) {
                    setFullName(user.full_name || '');
                    setPhone(user.phone || '');
                    setEmail(user.email || '');
                }
            }
        };

        fetchDefaultAddress();
    }, [user]);

    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const handleConfirmOrder = () => {
        // Here you would validate and send the order
        console.log("Order Data:", {
            items: cartItems,
            shipping: {
                fullName, phone, email, address, city: selectedCity, district: selectedDistrict, note
            },
            paymentMethod
        });
        alert("Đặt hàng thành công!");
    };

    // Calculate totals from selected items in cart
    const selectedItems = useMemo(() => cartItems.filter(item => item.selected), [cartItems]);
    const subtotal = useMemo(() => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [selectedItems]);
    const shipping = selectedItems.length > 0 ? 35000 : 0; // Fixed shipping logic to match cart

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

                        {/* Address Card & Additional Info (View Mode) */}
                        {!isEditingAddress && user ? (
                            <div className="space-y-4">
                                <AddressCard
                                    name={fullName || "Người dùng"}
                                    phone={phone || "Chưa có SĐT"}
                                    address={address || "Chưa có địa chỉ"}
                                    city={selectedCity}
                                    district={selectedDistrict}
                                    ward={selectedWard || "Phường/Xã"}
                                    onClick={() => navigate('/user/checkout/address')}
                                    linkTo="/user/checkout/address"
                                />

                                {/* Email & Note Inputs */}
                                <div className="space-y-3">
                                    {/* Email Input */}
                                    <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 shadow-sm">
                                        <span className="text-gray-400 text-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email nhận hóa đơn (Tùy chọn)"
                                            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                                        />
                                    </div>

                                    {/* Note Input */}
                                    <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 shadow-sm">
                                        <span className="text-gray-400 text-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Lưu ý cho người bán (Tùy chọn)"
                                            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ShippingForm
                                cities={cities}
                                districts={availableDistricts}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                selectedDistrict={selectedDistrict}
                                setSelectedDistrict={setSelectedDistrict}

                                // Pass form props
                                fullName={fullName} setFullName={setFullName}
                                phone={phone} setPhone={setPhone}
                                email={email} setEmail={setEmail}
                                address={address} setAddress={setAddress}
                                note={note} setNote={setNote}

                                onCancel={user && user.address ? () => setIsEditingAddress(false) : null}
                            />
                        )}

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
