import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import VoucherInput from './VoucherInput';
import VoucherItem from './VoucherItem';
import VoucherGuide from './VoucherGuide';
import VoucherConditions from './VoucherConditions';
import { useState } from 'react';
import { vouchers } from '../../../data/vouchers';

export default function VoucherModal({ isOpen, onClose, onSelectVoucher }) {
    const { t } = useLanguage();
    const [voucherCode, setVoucherCode] = useState('');
    const [showGuide, setShowGuide] = useState(false);
    const [showConditions, setShowConditions] = useState(false);



    const handleApplyCode = () => {
        const voucher = vouchers.find(v => v.code === voucherCode.toUpperCase());
        if (voucher) {
            if (voucher.status === 'out_of_stock') {
                alert(t('voucher.outOfStock') || 'Voucher đã hết lượt sử dụng');
                return;
            }
            onSelectVoucher(voucher);
            onClose();
        } else {
            alert(t('voucher.invalidCode') || 'Mã voucher không hợp lệ');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl w-full max-w-md h-[90vh] md:h-auto md:max-h-[80vh] flex flex-col shadow-2xl animate-fade-in-up">
                {/* Header */}
                {!showConditions && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    if (showGuide) setShowGuide(false);
                                    else if (showConditions) setShowConditions(false);
                                    else onClose();
                                }}
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
                )}

                {/* Content */}
                <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${showConditions ? 'p-0 bg-white dark:bg-gray-900 rounded-xl' : ''}`}>
                    {showGuide ? (
                        <VoucherGuide onBack={() => setShowGuide(false)} />
                    ) : showConditions ? (
                        <VoucherConditions onBack={() => setShowConditions(false)} />
                    ) : (
                        <>
                            <VoucherInput
                                value={voucherCode}
                                onChange={setVoucherCode}
                                onApply={handleApplyCode}
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
                                        onViewConditions={() => setShowConditions(true)}
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
