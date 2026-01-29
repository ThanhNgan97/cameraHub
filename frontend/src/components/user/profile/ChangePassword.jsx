import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoMdHelpCircle } from "react-icons/io";
import { FaLock, FaKey, FaEye, FaEyeSlash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleShow = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };



    const handleSubmit = async () => {
        // Validation
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error(t('profile.password.error.empty'));
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error(t('profile.password.error.mismatch'));
            return;
        }

        if (formData.newPassword.length < 6 || !/[A-Z]/.test(formData.newPassword) || !/[0-9!@#...]/.test(formData.newPassword)) {
            toast.error('Mật khẩu chưa đạt yêu cầu bảo mật (6 ký tự, 1 chữ hoa, 1 số/ký tự đặc biệt)');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/auth/change-password',
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('Đổi mật khẩu thành công');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            setTimeout(() => {
                navigate(-1);
            }, 2000);

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Đổi mật khẩu thất bại';
            toast.error(msg);
        }
    };

    // Validation checks
    const hasMinLength = formData.newPassword.length >= 6;
    const hasUpperCase = /[A-Z]/.test(formData.newPassword);
    const hasNumberOrSpecial = /[0-9!@#...]/.test(formData.newPassword);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[600px] mx-auto px-4 py-8">
                {/* Header Title */}
                <div className="flex items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.password.title')}</h1>
                </div>

                {/* Hero Icon */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center mb-4">
                        <MdSecurity size={40} className="text-[#F59E0B]" />
                    </div>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                        {t('profile.password.desc')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-6">

                    {/* Current Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('profile.password.current')}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword.current ? "text" : "password"}
                                name="currentPassword"
                                placeholder={t('profile.password.currentPlaceholder')}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                            />
                            <button
                                onClick={() => toggleShow('current')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="flex justify-end pt-1">
                            <span className="text-xs font-bold text-[#F59E0B] cursor-pointer hover:underline">{t('profile.password.forgot')}</span>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('profile.password.new')}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaKey />
                            </span>
                            <input
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                placeholder={t('profile.password.newPlaceholder')}
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                            />
                            <button
                                onClick={() => toggleShow('new')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('profile.password.confirm')}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaCheckCircle />
                            </span>
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder={t('profile.password.confirmPlaceholder')}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                            />
                            <button
                                onClick={() => toggleShow('confirm')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                        <h3 className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase mb-3">{t('profile.password.requirements.title')}</h3>
                        <div className="space-y-2">
                            <div className={`flex items-center gap-2 text-sm ${hasMinLength ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                                {hasMinLength ? <FaCheckCircle size={14} /> : <FaRegCircle size={14} />}
                                <span>{t('profile.password.requirements.length')}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${hasUpperCase ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                                {hasUpperCase ? <FaCheckCircle size={14} /> : <FaRegCircle size={14} />}
                                <span>{t('profile.password.requirements.uppercase')}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${hasNumberOrSpecial ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                                {hasNumberOrSpecial ? <FaCheckCircle size={14} /> : <FaRegCircle size={14} />}
                                <span>{t('profile.password.requirements.special')}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all text-lg"
                >
                    {t('profile.password.update')}
                </button>
            </main>

            <Footer />
        </div>
    );
}
