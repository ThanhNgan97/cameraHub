import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const products = [
    {
        id: 3,
        name: "FE 24-70mm GM II",
        category: "G Master Lens",
        price: "45.990.000đ",
        discount: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7QefPTiIQ9mZo2nWmm2qLARfMdM-SeSBWZ7zrlGYLiGRqm43rcSODblWzqoTZqlQrXjDp6WwxeyGMLANenV3a4JXeNbmW2VKY2iYQvzEl0MjHQKZOqLWKQ-J2-6c1tVy2_HkjpUbUbKTtOF06xYL3cGjVoIPbZywH6omin_NMxQCMouVjLvf3A_P03QqWgINqSh7fRpx9Urh9ec6GTdd-7oeIo6Y-26oIJcJ2vJOPOFFlBJ4og_psr6sapBSjk1DX6rDIqwL0Fcm"
    },
    {
        id: 9,
        name: "Sony Alpha A6400",
        category: "Mirrorless APS-C",
        price: "23.990.000đ",
        discount: "-8%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNGR2IzzITchfVN_Y0hhOvYf7i-UXZ6fpkgo9HBmqOo1dJuGjfm-uxSZZC6o41kXRCF9Bc_jzB1K_kEtvUnptlM7rxP2AOvSp8XpSY1N4qclDkkuzyK2R2pNnjcWKGWDRlhJBIiD44GHPJyXmLHja_3cwV9nrN56X198B5AvNS6m42JeO-6Xy5TJdqErdXe6Y2UE0xZ5rDGhmlZA5niNChTeQ22Z9N0MEvo4AVayfDl6K1NzFNv_Hmk3z--w86vA4yGjHwoS0RoNK6"
    },
    {
        id: 7,
        name: "FE 70-200mm GM II",
        category: "Telephoto Zoom",
        price: "67.990.000đ",
        discount: "-10%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7QefPTiIQ9mZo2nWmm2qLARfMdM-SeSBWZ7zrlGYLiGRqm43rcSODblWzqoTZqlQrXjDp6WwxeyGMLANenV3a4JXeNbmW2VKY2iYQvzEl0MjHQKZOqLWKQ-J2-6c1tVy2_HkjpUbUbKTtOF06xYL3cGjVoIPbZywH6omin_NMxQCMouVjLvf3A_P03QqWgINqSh7fRpx9Urh9ec6GTdd-7oeIo6Y-26oIJcJ2vJOPOFFlBJ4og_psr6sapBSjk1DX6rDIqwL0Fcm"
    },
    {
        id: 1,
        name: "Sony Alpha 7 IV",
        category: "Body Only",
        price: "59.990.000đ",
        discount: "-10%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
    },
    {
        id: 12,
        name: "Sony FX30",
        category: "Cinema Line APS-C",
        price: "39.990.000đ",
        discount: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7QefPTiIQ9mZo2nWmm2qLARfMdM-SeSBWZ7zrlGYLiGRqm43rcSODblWzqoTZqlQrXjDp6WwxeyGMLANenV3a4JXeNbmW2VKY2iYQvzEl0MjHQKZOqLWKQ-J2-6c1tVy2_HkjpUbUbKTtOF06xYL3cGjVoIPbZywH6omin_NMxQCMouVjLvf3A_P03QqWgINqSh7fRpx9Urh9ec6GTdd-7oeIo6Y-26oIJcJ2vJOPOFFlBJ4og_psr6sapBSjk1DX6rDIqwL0Fcm"
    },
    {
        id: 5,
        name: "Sony GP-VPT2BT",
        category: "Shooting Grip",
        price: "2.990.000đ",
        discount: "-5%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrkrlXLExB25Vo7bW0EUR0nSC152jG5Mh6IsowsS2LGmgavV_7Z9VGep5CfYgMRBqqtecX5a7uoEYjBTEBo0Fh0Bk25tdBFDgQlNohYngOHDj3Be1JZFLhNgScYJwGteQDF-Iaw2BL8q3cPX2z2XbzyTdDbDbkcakwtK-rchr6mqjelXgBBYzt3wdD6EakSfpuf9vuMstGkqVYiZ0OgRdBCJXRhOaRcIb7e-1Ggep8LCdrYWu8GPW9Uy7VNrEyAmIQWf06fJpYG-k"
    },
    {
        id: 10,
        name: "Sony Alpha A6600",
        category: "APS-C Premium",
        price: "29.990.000đ",
        discount: "-7%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNGR2IzzITchfVN_Y0hhOvYf7i-UXZ6fpkgo9HBmqOo1dJuGjfm-uxSZZ6o41kXRCF9Bc_jzB1K_kEtvUnptlM7rxP2AOvSp8XpSY1N4qclDkkuzyK2R2pNnjcWKGWDRlhJBIiD44GHPJyXmLHja_3cwV9nrN56X198B5AvNS6m42JeO-6Xy5TJdqErdXe6Y2UE0xZ5rDGhmlZA5niNChTeQ22Z9N0MEvo4AVayfDl6K1NzFNv_Hmk3z--w86vA4yGjHwoS0RoNK6"
    },
    {
        id: 2,
        name: "Sony ZV-E10",
        category: "Kit 16-50mm",
        price: "16.990.000đ",
        discount: "-15%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGx7A4URJ5YCHz2IW_xFaOkCANZPUZL5m2UqYZi63SU4s234tjvPNSk85MqMEyj3uhZS8WZgk2oCHbLZWc2ziyRmg43OJVU-Tv4rWhdv8noEcoowp-dhuc1vxBZhMf1K09pTvVxDb7wZDyL0DgvVTJeC4swszLcw9ZOkMwkk9kZ3MxcZq_RHqaHLMJySZkOIKH4H7JbGnQ4F9N142-iAHPB0KgMngQv8awfuaztQQfGakKh0L3DtgnLYqMqtbabAW7ZEgN0B4Q3wC5"
    },
    {
        id: 14,
        name: "FE 28-70mm Kit",
        category: "Lens",
        price: "6.990.000đ",
        discount: "-5%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7QefPTiIQ9mZo2nWmm2qLARfMdM-SeSBWZ7zrlGYLiGRqm43rcSODblWzqoTZqlQrXjDp6WwxeyGMLANenV3a4JXeNbmW2VKY2iYQvzEl0MjHQKZOqLWKQ-J2-6c1tVy2_HkjpUbUbKTtOF06xYL3cGjVoIPbZywH6omin_NMxQCMouVjLvf3A_P03QqWgINqSh7fRpx9Urh9ec6GTdd-7oeIo6Y-26oIJcJ2vJOPOFFlBJ4og_psr6sapBSjk1DX6rDIqwL0Fcm"
    },
    {
        id: 6,
        name: "Sony Alpha 7R V",
        category: "High Resolution",
        price: "89.990.000đ",
        discount: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrkrlXLExB25Vo7bW0EUR0nSC152jG5Mh6IsowsS2LGmgavV_7Z9VGep5CfYgMRBqqtecX5a7uoEYjBTEBo0Fh0Bk25tdBFDgQlNohYngOHDj3Be1JZFLhNgScYJwGteQDF-Iaw2BL8q3cPX2z2XbzyTdDbDbkcakwtK-rchr6mqjelXgBBYzt3wdD6EakSfpuf9vuMstGkqVYiZ0OgRdBCJXRhOaRcIb7e-1Ggep8LCdrYWu8GPW9Uy7VNrEyAmIQWf06fJpYG-k"
    },
    {
        id: 11,
        name: "Sony RX100 VII",
        category: "Compact Camera",
        price: "24.990.000đ",
        discount: "-10%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
    },
    {
        id: 13,
        name: "Sony A1",
        category: "Flagship Mirrorless",
        price: "159.990.000đ",
        discount: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
    },
    {
        id: 8,
        name: "Sony FX3",
        category: "Cinema Line",
        price: "92.990.000đ",
        discount: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
    },
    {
        id: 15,
        name: "Sony ZV-E1",
        category: "Vlog Full-frame",
        price: "79.990.000đ",
        discount: "-12%",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
    }
];


export default function SpecialOffers() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useLanguage();

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const visibleProducts = [...products, ...products].slice(currentIndex, currentIndex + 4);

    return (
        <div id="special-offers" className="max-w-[1440px] mx-auto py-16 space-y-10">
            <div className="px-4 lg:px-8 flex items-center justify-between">
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">
                    {t('offers.title')}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-8">
                {visibleProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-50 dark:bg-gray-900">
                            {product.discount && (
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                    {product.discount}
                                </span>
                            )}
                            <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{
                                    backgroundImage: `url('${product.image}')`,
                                }}
                            ></div>
                        </div>
                        <h3 className="text-lg font-bold truncate mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {product.category}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-primary font-bold text-xl">{product.price}</p>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-xl">
                                    add_shopping_cart
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
