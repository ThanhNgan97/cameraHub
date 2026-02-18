import { useState, useMemo, useEffect } from 'react';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import addressService from '../../../services/addressService';
import orderService from '../../../services/orderService'; // Import orderService
import bankConfig from '../../../config/bankConfig'; // Import bankConfig
import ShippingForm from './ShippingForm';
import PaymentSection from './PaymentSection';
import OrderSummary from './OrderSummary';
import AddressCard from './AddressCard';
import { vietnamLocations } from '../../../i18n/vietnam_locations';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CheckoutPage() {
    const { t } = useLanguage();
    const { cartItems, clearCart } = useCart(); // Assuming clearCart exists
    const { user } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const navigate = useNavigate();

    // Form State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    // Location state
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);

    // QR Code Modal State
    const [showQRModal, setShowQRModal] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success Modal State

    // Timer logic
    useEffect(() => {
        let timer;
        if (showQRModal && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Optional: Handle timeout (e.g., close modal or show expired message)
            // For now, let's just keep it at 0
        }
        return () => clearInterval(timer);
    }, [showQRModal, timeLeft]);

    // Reset timer when modal opens
    useEffect(() => {
        if (showQRModal) {
            setTimeLeft(120);
        }
    }, [showQRModal]);

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
                    setEmail(defaultAddr.email || user.email || '');
                    setAddress(defaultAddr.address_detail || '');
                    setSelectedCity(defaultAddr.province || '');
                    setSelectedDistrict(defaultAddr.district || '');
                    setSelectedWard(defaultAddr.ward || '');

                    if (defaultAddr.province) {
                        const cityData = vietnamLocations.find(c => c.name === defaultAddr.province);
                        setAvailableDistricts(cityData ? cityData.districts : []);
                    }
                } else {
                    setFullName(user.full_name || '');
                    setPhone(user.phone || '');
                    setEmail(user.email || '');
                }
            } catch (error) {
                console.error("Failed to fetch default address", error);
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

    // Calculate totals from selected items in cart
    const selectedItems = useMemo(() => cartItems.filter(item => item.selected), [cartItems]);
    const subtotal = useMemo(() => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [selectedItems]);
    const shipping = 0;
    const totalAmount = subtotal + shipping;

    const handleConfirmOrder = async () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn sản phẩm để thanh toán");
            return;
        }

        if (!fullName || !phone || !address || !selectedCity || !selectedDistrict) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng");
            return;
        }

        try {
            const orderData = {
                items: selectedItems,
                shipping: {
                    fullName, phone, email, address, city: selectedCity, district: selectedDistrict, ward: selectedWard, note
                },
                paymentMethod
            };

            const response = await orderService.createOrder(orderData);

            if (response.success) {
                if (paymentMethod === 'banking') {
                    // Show QR Code logic
                    const { bankId, accountNo, accountName, template } = bankConfig;
                    const amount = response.grandTotal;
                    const addInfo = `DH${response.orders[0].id}`; // Use first order ID for content

                    // Use config values
                    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template || 'compact2'}.png?amount=${amount}&addInfo=${addInfo}&accountName=${encodeURIComponent(accountName)}`;

                    setQrData({ qrUrl, amount, addInfo, accountName, accountNo, bankId });
                    setShowQRModal(true);

                    // Optional: Clear cart here or after closing modal? 
                    // Usually clear cart after order creation to avoid double order
                    // But if they don't pay? Order is still created as Pending.
                    // Use a safe check if clearCart is available
                    if (clearCart) clearCart();

                } else if (paymentMethod === 'cod') {
                    // Show custom success modal instead of alert
                    if (clearCart) clearCart();
                    setShowSuccessModal(true);
                } else {
                    // Default success for other methods
                    if (clearCart) clearCart();
                    setShowSuccessModal(true);
                }
            }

        } catch (error) {
            console.error("Order error:", error);
            alert("Đặt hàng thất bại. Vui lòng thử lại.");
        }
    };

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
                                    <div className="flex items-start gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 shadow-sm">
                                        <span className="text-gray-400 text-lg mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                            </svg>
                                        </span>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Lưu ý cho người bán (Tùy chọn)"
                                            rows={3}
                                            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm resize-none"
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

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-center transform transition-all scale-100 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600 dark:text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Đặt hàng thành công!</h3>
                        <p className="text-gray-500 text-sm mb-6">Cảm ơn bạn đã mua sắm tại CameraHub. Đơn hàng của bạn đang được xử lý.</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/user/profile', { state: { activeTab: 'pending' } })}
                                className="w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold transition-colors"
                            >
                                Xem đơn hàng của tôi
                            </button>
                            <button
                                onClick={() => navigate('/user/products')}
                                className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {showQRModal && qrData && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowQRModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-6 mt-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quét mã để thanh toán</h3>
                            <p className="text-sm text-gray-500">Sử dụng ứng dụng ngân hàng để quét mã QR</p>
                            <div className="mt-2 text-[#F59E0B] font-medium flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-6 p-4 bg-white rounded-xl border border-gray-100 dark:border-gray-700">
                            <img
                                src={qrData.qrUrl}
                                alt="VietQR Code"
                                className="w-full max-w-[300px] h-auto object-contain"
                            />
                        </div>

                        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Ngân hàng:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{qrData.bankId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Số tài khoản:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{qrData.accountNo}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Chủ tài khoản:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{qrData.accountName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Số tiền:</span>
                                <span className="font-bold text-[#F59E0B]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(qrData.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Nội dung:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{qrData.addInfo}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowQRModal(false);
                                navigate('/user/orders');
                            }}
                            className="w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold transition-colors"
                        >
                            Đã thanh toán (Hoàn tất)
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
