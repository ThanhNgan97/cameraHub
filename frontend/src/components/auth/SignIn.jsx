import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export default function SignIn({ onForgotPassword }) {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                await login(formData.email, formData.password);
                navigate('/user/home');
            } catch (err) {
                const msg = err.response?.data?.message;
                if (msg === 'User not found') {
                    setErrors(prev => ({ ...prev, email: t('auth.userNotFound') }));
                } else if (msg === 'Incorrect password') {
                    setErrors(prev => ({ ...prev, password: t('auth.wrongPassword') }));
                } else {
                    setErrors(prev => ({
                        ...prev,
                        form: msg || 'Login failed'
                    }));
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name] || errors.form) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
                form: ''
            }));
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                await googleLogin(tokenResponse.access_token);
                navigate('/user/home');
            } catch (err) {
                console.error(err);
                setErrors(prev => ({ ...prev, form: 'Google login failed' }));
            } finally {
                setLoading(false);
            }
        },
        onError: () => setErrors(prev => ({ ...prev, form: 'Google login failed' })),
    });

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {errors.form && <div className="text-red-500 text-sm text-center font-bold">{errors.form}</div>}

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

            <button disabled={loading} className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Logging in...' : t('auth.login')}
            </button>

            <div className="relative flex items-center justify-center" style={{ marginTop: '50px' }}>
                <hr className="w-full border-gray-300" />
                <span className="absolute bg-white dark:bg-[#1F2937] px-2 text-gray-500 text-sm">
                    {t('auth.or')}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => handleGoogleLogin()}
                    className="flex items-center justify-center h-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <FaGoogle className="text-red-500 text-xl" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-2">Google</span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        console.log('GitHub login clicked');
                        window.location.href = 'http://localhost:3000/api/auth/github';
                    }}
                    className="flex items-center justify-center h-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative z-10 cursor-pointer"
                >
                    <FaGithub className="text-gray-900 dark:text-white text-xl" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-2">Github</span>
                </button>
            </div>
        </form>
    );
}
