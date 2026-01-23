import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';


export default function SignIn({ onForgotPassword }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();

    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = t('auth.required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('auth.invalidEmail');
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = t('auth.required');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Handle login logic here
            console.log('Login submitted:', formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
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

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                    {t('auth.forgot')}
                </button>
            </div>

            <button className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all">
                {t('auth.login')}
            </button>
        </form>
    );
}
