import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import authService from '../../services/authService';

export default function VerifyOTP({ onSuccess }) {
    const { t } = useLanguage();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes matching backend

    const inputRefs = useRef([]);

    // Countdown Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Handle OTP Input Change
    const handleChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        const token = otp.join('');
        if (token.length !== 6) {
            setStatus({ type: 'error', message: 'Vui lòng nhập đủ 6 số mã xác thực' });
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setStatus({ type: 'error', message: 'Mật khẩu phải có ít nhất 6 ký tự' });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setStatus({ type: 'error', message: 'Mật khẩu xác nhận không khớp' });
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword(token, password);
            setStatus({ type: 'success', message: 'Đặt lại mật khẩu thành công! Đang chuyển hướng...' });
            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error.response?.data?.message || 'Đặt lại mật khẩu thất bại' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit}>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Xác thực & Đổi mật khẩu
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                    Nhập mã xác thực đã được gửi tới email của bạn và mật khẩu mới.
                </p>
            </div>

            {status.message && (
                <div className={`text-sm text-center font-bold px-4 py-2 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {status.message}
                </div>
            )}

            {/* OTP Inputs */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Mã xác thực</label>
                <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-12 lg:w-12 lg:h-14 text-center text-xl font-bold bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white transition-all caret-primary"
                        />
                    ))}
                </div>
                <div className="text-center text-xs text-gray-500">
                    Mã hết hạn sau: {formatTime(timeLeft)}
                </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Mật khẩu mới</label>
                <div className="relative group">
                    <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Xác nhận mật khẩu</label>
                <div className="relative group">
                    <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-12 pl-11 pr-11 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
        </form>
    );
}
