import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import VoucherInput from './VoucherInput';
import VoucherItem from './VoucherItem';
import VoucherGuide from './VoucherGuide';
import { useState } from 'react';

export default function VoucherModal({ isOpen, onClose, onSelectVoucher }) {
    const { t } = useLanguage();
    const [voucherCode, setVoucherCode] = useState('');
    const [showGuide, setShowGuide] = useState(false);

    // Mock data - In real app, fetch from API
    const vouchers = [
        {
            id: 1,
            type: 'all',
            typeLabel: 'CAMERAHUB',
            title: 'Giảm 500k cho đơn từ 5tr',
            subtitle: 'Đơn tối thiểu 5tr',
            status: 'expiring',
            daysLeft: 2,
            isSaved: true,
            statusText: 'Sắp hết hạn',
        },
        {
            id: 2,
            type: 'shipping',
            typeLabel: 'VẬN CHUYỂN',
            title: 'Miễn phí vận chuyển',
            subtitle: 'Tối đa 30k • Đơn từ 0đ',
            status: 'active',
            isSaved: false,
            statusText: '',
        },
        {
            id: 3,
            type: 'all',
            typeLabel: 'PHỤ KIỆN',
            title: 'Giảm 10% cho Lens Filter',
            subtitle: 'Hết hạn: 31/12/2026',
            status: 'active',
            isSaved: true,
            statusText: '',
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" // Example image
        },
        {
            id: 4,
            type: 'store',
            typeLabel: 'CỬA HÀNG',
            title: 'Giảm 1tr cho đơn Sony A7R',
            subtitle: 'Số lượng đã hết',
            status: 'out_of_stock',
            isSaved: false,
            statusText: '',
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl w-full max-w-md h-[90vh] md:h-auto md:max-h-[80vh] flex flex-col shadow-2xl animate-fade-in-up">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={showGuide ? () => setShowGuide(false) : onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                            <FaArrowLeft />
                        </button>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {showGuide ? t('voucher.guide') : t('voucher.title')}
                        </h3>
                    </div>
                    {showGuide ? (
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                            <FaTimes />
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowGuide(true)}
                            className="text-sm text-orange-500 font-medium hover:text-orange-600"
                        >
                            {t('voucher.guide')}
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {showGuide ? (
                        <VoucherGuide onBack={() => setShowGuide(false)} />
                    ) : (
                        <>
                            <VoucherInput
                                value={voucherCode}
                                onChange={setVoucherCode}
                                onApply={() => console.log('Apply', voucherCode)}
                            />

                            {/* Voucher List Header */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('voucher.forYou')}</h4>
                                <span className="text-xs text-gray-500">3 {t('voucher.expiringCount')}</span>
                            </div>

                            {/* Voucher List */}
                            <div className="space-y-3">
                                {vouchers.map(voucher => (
                                    <VoucherItem
                                        key={voucher.id}
                                        voucher={voucher}
                                        onSelect={(v) => {
                                            onSelectVoucher(v);
                                            onClose();
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
