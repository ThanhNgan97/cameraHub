import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MdLock } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../../services/authService';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword(token, password);
            setMessage('Password reset successful. Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return <div className="text-center mt-20 text-red-500">Invalid Token</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Reset Password</h2>

                {message && <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-center font-medium">{message}</div>}
                {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">New Password</label>
                        <div className="relative group">
                            <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-primary/50 rounded-xl outline-none text-gray-900 dark:text-white transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-primary/50 rounded-xl outline-none text-gray-900 dark:text-white transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Reseting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
