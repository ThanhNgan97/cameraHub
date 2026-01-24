import { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { MdEmail, MdLock, MdCached } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';


import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t } = useLanguage();

    const validate = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = t('auth.required');
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = t('auth.nameTooShort');
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = t('auth.required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('auth.invalidEmail');
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = t('auth.required');
        } else if (formData.password.length < 6) {
            newErrors.password = t('auth.passwordTooShort');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(formData.password)) {
            newErrors.password = t('auth.passwordComplexity');
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('auth.passwordMismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Handle registration logic here
            console.log('Form submitted:', formData);
            // Navigate to User Home
            navigate('/user/home');
            // We should also close the modal potentially, but since we are navigating away, 
            // the modal usually lives in context or parent. 
            // If the modal is in Navbar (which is present in Home too), we might need to close it.
            // But navigation usually unmounts or changes context. 
            // Let's assume navigation is enough for now, or the user will ask to close modal.
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1.5 animate-slide-down">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {t('auth.fullname')} <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                    <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-sm ${errors.fullName ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        type="text"
                        placeholder={t('auth.fullname_placeholder')}
                        className={`w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-gray-800 border-2 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary/20'}`}
                    />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs ml-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {t('auth.email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                    <MdEmail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-lg ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="ban@example.com"
                        className={`w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-gray-800 border-2 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary/20'}`}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {t('auth.password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                    <MdLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-lg ${errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-800 border-2 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary/20'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5 animate-slide-down">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {t('auth.confirmPassword')} <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                    <MdCached className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-lg ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
                    <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-800 border-2 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary/20'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs ml-1">{errors.confirmPassword}</p>}
            </div>

            <button className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all">
                {t('auth.register')}
            </button>
        </form>
    );
}
