import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';

export default function UserInfo() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { user } = useAuth();

    // Logic for display name: Prioritize full name, fallback to email username
    const displayName = user?.full_name || user?.fullName || user?.email?.split('@')[0] || t('profile.user');
    const displayEmail = user?.email || '';

    // Get first letter for avatar
    const firstLetter = displayName ? displayName.charAt(0).toUpperCase() : 'U';

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 text-center">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('profile.personalInfo')}</h2>
                <button
                    onClick={() => navigate('/user/profile/edit')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                    {t('profile.editInfo')}
                </button>
            </div>

            <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg relative z-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                            {firstLetter}
                        </span>
                    )}
                </div>

            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {displayName}
            </h3>
            <p className="text-gray-500 text-sm">
                {displayEmail}
            </p>
        </div>
    );
}
