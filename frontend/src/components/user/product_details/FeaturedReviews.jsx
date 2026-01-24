import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

export default function FeaturedReviews() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useLanguage();

    const reviews = [
        {
            id: 1,
            name: "Minh Hoàng",
            avatar: "MH",
            avatarColor: "bg-blue-500",
            rating: 5,
            date: "2 ngày trước",
            content: "Máy lấy nét siêu nhanh, AI nhận diện chủ thể cực kỳ chính xác. Màu da lên đẹp hơn đời trước rất nhiều.",
            images: [
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            ]
        },
        {
            id: 2,
            name: "Linh Dan",
            avatar: "LD",
            avatarColor: "bg-purple-500",
            rating: 4,
            date: "1 tuần trước",
            content: "Giao hàng nhanh, đóng gói cẩn thận. Máy mới 100% nguyên seal.",
            images: []
        },
        {
            id: 3,
            name: "Tuấn Anh",
            avatar: "TA",
            avatarColor: "bg-green-500",
            rating: 5,
            date: "2 tuần trước",
            content: "Sản phẩm tuyệt vời trong tầm giá. Nhân viên tư vấn nhiệt tình.",
            images: []
        },
        {
            id: 4,
            name: "Hồng Nhung",
            avatar: "HN",
            avatarColor: "bg-red-500",
            rating: 5,
            date: "3 tuần trước",
            content: "Đã mua nhiều lần tại đây và luôn hài lòng về chất lượng.",
            images: []
        },
        {
            id: 5,
            name: "Quốc Bảo",
            avatar: "QB",
            avatarColor: "bg-yellow-500",
            rating: 4,
            date: "1 tháng trước",
            content: "Màn hình nét, pin trâu. Sẽ ủng hộ shop dài dài.",
            images: []
        }
    ];

    const displayedReviews = isExpanded ? reviews : reviews.slice(0, 2);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t("productDetail.featuredReviews")}</h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#F59E0B] text-sm font-bold hover:underline"
                >
                    {isExpanded ? t("productDetail.collapse") : t("productDetail.viewAll")}
                </button>
            </div>

            <div className="space-y-6 transition-all duration-300">
                {displayedReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-sm`}>
                                    {review.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</div>
                                    <div className="flex items-center gap-1 text-[#F59E0B] text-xs">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < review.rating ? "" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {review.content}
                        </p>
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2">
                                {review.images.map((img, idx) => (
                                    <div key={idx} className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                        <img src={img} alt="review" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
