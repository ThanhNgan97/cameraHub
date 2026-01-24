import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function UserInfo() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('profile.personalInfo')}</h2>

            <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg relative z-10">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <button
                    onClick={() => navigate('/user/profile/edit')}
                    className="absolute bottom-1 right-1 z-20 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-md border border-gray-100 dark:border-gray-700 hover:text-[#F59E0B] transition-colors"
                >
                    <FaPen size={14} />
                </button>
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Nguyễn Văn A</h3>
            <p className="text-gray-500 text-sm">nguyenvana@example.com</p>
        </div>
    );
}
