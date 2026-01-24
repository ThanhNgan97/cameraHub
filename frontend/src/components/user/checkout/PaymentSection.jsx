import { FaMoneyBillWave, FaTruck, FaUniversity, FaCreditCard, FaQrcode } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function PaymentSection({ paymentMethod, setPaymentMethod }) {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#F59E0B] text-xl"><FaMoneyBillWave /></span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('checkout.paymentMethod')}</h2>
            </div>

            <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#F59E0B] bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#F59E0B] focus:ring-[#F59E0B]"
                    />
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{t('checkout.cod')}</div>
                        <div className="text-xs text-gray-500">{t('checkout.codDesc')}</div>
                    </div>
                    <FaTruck className="text-gray-400 text-xl" />
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-[#F59E0B] bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#F59E0B] focus:ring-[#F59E0B]"
                    />
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{t('checkout.banking')}</div>
                        <div className="text-xs text-gray-500">{t('checkout.bankingDesc')}</div>
                    </div>
                    <FaUniversity className="text-gray-400 text-xl" />
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#F59E0B] bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#F59E0B] focus:ring-[#F59E0B]"
                    />
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{t('checkout.card')}</div>
                        <div className="text-xs text-gray-500">{t('checkout.cardDesc')}</div>
                    </div>
                    <FaCreditCard className="text-gray-400 text-xl" />
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'ewallet' ? 'border-[#F59E0B] bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="ewallet"
                        checked={paymentMethod === 'ewallet'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#F59E0B] focus:ring-[#F59E0B]"
                    />
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{t('checkout.ewallet')}</div>
                        <div className="text-xs text-gray-500">{t('checkout.ewalletDesc')}</div>
                    </div>
                    <FaQrcode className="text-gray-400 text-xl" />
                </label>
            </div>
        </div>
    );
}
