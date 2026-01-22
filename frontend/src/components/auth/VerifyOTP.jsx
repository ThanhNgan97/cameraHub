import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function VerifyOTP() {
    const { t } = useLanguage();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(59);
    const inputRefs = useRef([]);

    // Countdown Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Handle Input Change
    const handleChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple chars

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle Backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <form className="space-y-6 animate-fade-in" onSubmit={(e) => e.preventDefault()}>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('auth.otp_title')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                    {t('auth.otp_desc')}
                </p>
            </div>

            {/* OTP Inputs */}
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

            <button className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-[0px] transition-all">
                {t('auth.verify')}
            </button>

            {/* Resend Link */}
            <div className="text-center text-sm text-gray-500">
                {t('auth.not_received')} <button
                    type="button"
                    className={`font-bold transition-colors ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#F59E0B] hover:underline'}`}
                    disabled={timeLeft > 0}
                    onClick={() => setTimeLeft(59)}
                >
                    {t('auth.resend')} {timeLeft > 0 && `(${formatTime(timeLeft)})`}
                </button>
            </div>
        </form>
    );
}
