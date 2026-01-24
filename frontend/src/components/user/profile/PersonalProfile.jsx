import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaUserEdit, FaMapMarkerAlt, FaKey, FaCreditCard, FaSignOutAlt, FaCog, FaCamera } from 'react-icons/fa';
import NavbarActions from '../../common/NavbarActions';
import Footer from '../../landing/Footer';
import { useLanguage } from '../../../context/LanguageContext';

export default function PersonalProfile() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const fileInputRef = useRef(null);
    const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80");

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const menuItems = [
        {
            id: 'info',
            icon: <FaUserEdit className="text-blue-500" size={20} />,
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            title: t('profile.settings.menu.info.title'),
            desc: t('profile.settings.menu.info.desc'),
            link: '/user/profile/info'
        },
        {
            id: 'address',
            icon: <FaMapMarkerAlt className="text-green-500" size={20} />,
            bg: 'bg-green-50 dark:bg-green-900/10',
            title: t('profile.settings.menu.address.title'),
            desc: t('profile.settings.menu.address.desc'),
            link: '#'
        },
        {
            id: 'password',
            icon: <FaKey className="text-purple-500" size={20} />,
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            title: t('profile.settings.menu.password.title'),
            desc: t('profile.settings.menu.password.desc'),
            link: '/user/profile/password'
        },
        {
            id: 'payment',
            icon: <FaCreditCard className="text-orange-500" size={20} />,
            bg: 'bg-orange-50 dark:bg-orange-900/10',
            title: t('profile.settings.menu.payment.title'),
            desc: t('profile.settings.menu.payment.desc'),
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main className="max-w-[600px] mx-auto px-4 py-8">
                {/* Header Title */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.settings.title')}</h1>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        {/* <FaCog size={24} /> */}
                    </button>
                </div>

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4 group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-gray-900 text-white p-2 rounded-full border-2 border-white dark:border-gray-800 hover:bg-[#F59E0B] transition-colors shadow-md">
                            <FaCamera size={14} />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Minh Nhật</h2>
                    {/* <div className="bg-orange-50 text-[#F59E0B] px-4 py-1.5 rounded-full text-sm font-bold border border-orange-100 flex items-center gap-2">
                        <span>👑</span>
                        <span>Thành viên Vàng</span>
                    </div> */}
                </div>

                {/* Menu List */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => item.link !== '#' && navigate(item.link)}
                            className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                            <IoIosArrowForward className="text-gray-400" />
                        </div>
                    ))}
                </div>

                {/* Logout */}
                <button className="w-full bg-red-50 dark:bg-red-900/10 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                    <FaSignOutAlt />
                    <span>{t('profile.settings.logout')}</span>
                </button>
            </main>

            <Footer />
        </div>
    );
}
