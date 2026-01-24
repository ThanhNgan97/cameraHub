import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function CartItem({ item, onUpdateQuantity, onToggleSelect, onRemove }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="flex gap-4 py-4">
            {/* Checkbox */}
            <div className="pt-2">
                <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => onToggleSelect(item.id)}
                    className="w-5 h-5 rounded border-gray-300 text-[#F59E0B] focus:ring-[#F59E0B]"
                />
            </div>

            {/* Image */}
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Info */}
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 text-sm lg:text-base">
                        {item.name}
                    </h3>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>

                {item.classification && (
                    <div className="text-xs text-gray-500 mb-2">
                        Phân loại: {item.classification}
                    </div>
                )}

                <div className="flex justify-between items-end mt-4">
                    <span className="font-bold text-[#F59E0B]">
                        {formatPrice(item.price)}
                    </span>

                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F59E0B] disabled:opacity-50 transition-colors"
                        >
                            <FaMinus size={10} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F59E0B] transition-colors"
                        >
                            <FaPlus size={10} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
