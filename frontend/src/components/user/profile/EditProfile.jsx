import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaCamera, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';

export default function EditProfile() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { user, updateProfile, uploadAvatar } = useAuth();
    const [loading, setLoading] = useState(false);

    // Default values matching the image

    // Default values matching the image
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        gender: 'male'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '', // Format YYYY-MM-DD
                gender: user.gender || 'male'
            }));
            if (user.avatar) {
                setAvatar(user.avatar);
            }
        }
    }, [user]);

    // Avatar state (reused logic for consistency)
    const fileInputRef = useRef(null);
    const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80");

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = URL.createObjectURL(file);
                setAvatar(imageUrl);
                await uploadAvatar(file);
            } catch (error) {
                console.error("Failed to upload avatar", error);
                if (user?.avatar) setAvatar(user.avatar);
                alert("Failed to update avatar");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await updateProfile({
                full_name: formData.fullName,
                phone: formData.phone,
                dob: formData.dob,
                gender: formData.gender
            });
            alert(t('profile.edit.saved'));
            // navigate(-1); // navigate back or stay on page
        } catch (error) {
            console.error('Update profile error:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[600px] mx-auto px-4 py-8">
                {/* Header Title with Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <IoIosArrowBack size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.edit.title')}</h1>
                </div>

                {/* Avatar Section (Persisted) */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4 group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white dark:border-gray-800 shadow-md">
                            <FaCheckCircle size={12} />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">{t('profile.edit.fullName')}</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">{t('profile.edit.email')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={true}
                                    readOnly={true}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">{t('profile.edit.phone')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaPhone className="rotate-90" />
                                </span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-900 dark:text-white">{t('profile.edit.dob')}</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-900 dark:text-white">{t('profile.edit.gender')}</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#F59E0B] transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="male">{t('profile.edit.genderOptions.male')}</option>
                                    <option value="female">{t('profile.edit.genderOptions.female')}</option>
                                    <option value="other">{t('profile.edit.genderOptions.other')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full mt-8 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Saving...' : t('profile.edit.save')}
                </button>
            </main>


            <Footer />
        </div>
    );
}
