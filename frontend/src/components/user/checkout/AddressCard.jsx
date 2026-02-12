import React from 'react';
import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AddressCard({ name, phone, address, city, district, ward, onClick, linkTo }) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden cursor-pointer group relative border border-transparent dark:border-gray-800 hover:border-blue-500 transition-colors"
        >
            {/* Airmail Border Decoration - Thinner stripes */}
            <div className="h-[3px] w-full bg-[repeating-linear-gradient(45deg,#EF4444,#EF4444_20px,transparent_20px,transparent_40px,#3B82F6_40px,#3B82F6_60px,transparent_60px,transparent_80px)]"></div>

            <div className="p-4 flex items-start gap-3 sm:gap-4">
                <div className="text-[#F97316] text-lg mt-0.5">
                    <FaMapMarkerAlt />
                </div>

                <div className="flex-1">
                    <h3 className="text-base text-gray-900 dark:text-white mb-1">Địa chỉ nhận hàng</h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-bold text-gray-900 dark:text-white text-base">
                            {name}
                        </span>
                        <span className="hidden sm:block text-gray-300">|</span>
                        <span className="font-bold text-gray-900 dark:text-white text-base">
                            {phone}
                        </span>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {address}, {ward}, {district}, {city}
                    </p>
                </div>

                {linkTo ? (
                    <Link
                        to={linkTo}
                        className="text-gray-400 group-hover:text-[#F97316] transition-colors self-center z-10 p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaChevronRight />
                    </Link>
                ) : (
                    <div className="text-gray-400 group-hover:text-[#F97316] transition-colors self-center">
                        <FaChevronRight />
                    </div>
                )}
            </div>
        </div>
    );
}
