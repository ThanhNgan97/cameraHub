import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaCheck, FaPen } from 'react-icons/fa';
import NavbarActions from '../../common/NavbarActions';
import { useLanguage } from '../../../context/LanguageContext';
import addressService from '../../../services/addressService';
import { useAuth } from '../../../context/AuthContext';

const AddressModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        address_detail: '',
        is_default: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                full_name: '',
                phone: '',
                province: '',
                district: '',
                ward: '',
                address_detail: '',
                is_default: false
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase text-center">
                    {initialData ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Họ và tên"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none transition-colors"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-3 pt-2">
                        <input type="text" name="province" placeholder="Tỉnh/Thành phố" value={formData.province} onChange={handleChange} required className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none" />
                        <input type="text" name="district" placeholder="Quận/Huyện" value={formData.district} onChange={handleChange} required className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none" />
                        <input type="text" name="ward" placeholder="Phường/Xã" value={formData.ward} onChange={handleChange} required className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none" />
                        <input type="text" name="address_detail" placeholder="Địa chỉ cụ thể" value={formData.address_detail} onChange={handleChange} required className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-orange-500 outline-none" />
                    </div>

                    <div className="flex items-center pt-2">
                        <input
                            type="checkbox"
                            name="is_default"
                            id="is_default"
                            checked={formData.is_default}
                            onChange={handleChange}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>

                    <div className="flex gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 uppercase text-sm font-medium"
                        >
                            Trở lại
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-[#f69113] text-white rounded hover:bg-[#d97706] disabled:opacity-50 uppercase text-sm font-bold"
                        >
                            {loading ? 'Đang lưu...' : 'Hoàn thành'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function AddressSelection() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const response = await addressService.getAddresses();
            if (response.success) {
                setAddresses(response.addresses);
                const defaultAddr = response.addresses.find(a => a.is_default);
                if (defaultAddr && !selectedId) setSelectedId(defaultAddr.id);
                else if (response.addresses.length > 0 && !selectedId) setSelectedId(response.addresses[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch addresses', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddressSelect = (id) => {
        setSelectedId(id);
    };

    const handleConfirm = async () => {
        if (!selectedId) return;
        try {
            await addressService.setDefaultAddress(selectedId);
            navigate('/user/checkout');
        } catch (error) {
            console.error('Failed to confirm address', error);
        }
    };

    const handleSaveAddress = async (formData) => {
        let response;
        if (editingAddress) {
            response = await addressService.updateAddress(editingAddress.id, formData);
        } else {
            response = await addressService.addAddress(formData);
        }

        if (response.success) {
            await fetchAddresses();
        }
    };

    const openAddModal = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const openEditModal = (e, addr) => {
        e.stopPropagation();
        setEditingAddress(addr);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] pb-24 font-sans">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                        >
                            <FaArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chọn địa chỉ nhận hàng</h1>
                    </div>

                    {/* Address List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">Đang tải...</div>
                        ) : addresses.length === 0 ? (
                            <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào.</p>
                            </div>
                        ) : (
                            addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    onClick={() => handleAddressSelect(addr.id)}
                                    className={`
                                        group relative p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                        ${selectedId === addr.id
                                            ? 'border-[#fa8c16] bg-orange-50/50 dark:bg-orange-900/10'
                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}
                                    `}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedId === addr.id ? 'border-[#fa8c16]' : 'border-gray-300 dark:border-gray-600'
                                            }`}>
                                            {selectedId === addr.id && <div className="w-2.5 h-2.5 rounded-full bg-[#fa8c16]" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-gray-900 dark:text-white text-lg">{addr.full_name}</span>
                                                <span className="text-gray-500 dark:text-gray-400">|</span>
                                                <span className="text-gray-600 dark:text-gray-300">{addr.phone}</span>
                                                {addr.is_default && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium text-[#fa8c16] bg-orange-50 dark:bg-orange-900/20 rounded border border-[#fa8c16]/20">
                                                        Mặc định
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {addr.address_detail}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {addr.ward}, {addr.district}, {addr.province}
                                            </p>

                                            <button
                                                onClick={(e) => openEditModal(e, addr)}
                                                className="mt-3 text-sm font-medium text-[#fa8c16] hover:text-[#d97706] transition-colors"
                                            >
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Add New Address Button */}
                    <button
                        onClick={openAddModal}
                        className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-[#fa8c16] hover:text-[#fa8c16] transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-[#fa8c16] transition-colors">
                            <FaPlus className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="font-medium">Thêm địa chỉ mới</span>
                    </button>
                </div>
            </main>

            {/* Bottom Fixed Action - Adjusted width to match container */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-20">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex justify-end">
                    <button
                        onClick={handleConfirm}
                        className="bg-[#f69113] hover:bg-[#d97706] text-white font-bold py-3 px-8 rounded opacity-100 shadow-md transition-all active:scale-95"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAddress}
                initialData={editingAddress}
            />
        </div>
    );
}
