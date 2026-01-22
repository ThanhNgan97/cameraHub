import Navbar from "../Navbar";
import Footer from "../Footer";
import { FaPlay, FaShoppingCart } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function VideoPage() {
    const { t } = useLanguage();

    const relatedVideos = [
        {
            id: 1,
            title: t('videoPage.v1_title'),
            channel: "CameraHub Studio",
            views: "1.2M view",
            duration: "10:45",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrkrlXLExB25Vo7bW0EUR0nSC152jG5Mh6IsowsS2LGmgavV_7Z9VGep5CfYgMRBqqtecX5a7uoEYjBTEBo0Fh0Bk25tdBFDgQlNohYngOHDj3Be1JZFLhNgScYJwGteQDF-Iaw2BL8q3cPX2z2XbzyTdDbDbkcakwtK-rchr6mqjelXgBBYzt3wdD6EakSfpuf9vuMstGkqVYiZ0OgRdBCJXRhOaRcIb7e-1Ggep8LCdrYWu8GPW9Uy7VNrEyAmIQWf06fJpYG-k"
        },
        {
            id: 2,
            title: t('videoPage.v2_title'),
            channel: "Tips & Tricks",
            views: "45K view",
            duration: "08:20",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNGR2IzzITchfVN_Y0hhOvYf7i-UXZ6fpkgo9HBmqOo1dJuGjfm-uxSZZC6o41kXRCF9Bc_jzB1K_kEtvUnptlM7rxP2AOvSp8XpSY1N4qclDkkuzyK2R2pNnjcWKGWDRlhJBIiD44GHPJyXmLHja_3cwV9nrN56X198B5AvNS6m42JeO-6Xy5TJdqErdXe6Y2UE0xZ5rDGhmlZA5niNChTeQ22Z9N0MEvo4AVayfDl6K1NzFNv_Hmk3z--w86vA4yGjHwoS0RoNK6"
        },
        {
            id: 3,
            title: t('videoPage.v3_title'),
            channel: "CameraHub Studio",
            views: "89K view",
            duration: "15:10",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7QefPTiIQ9mZo2nWmm2qLARfMdM-SeSBWZ7zrlGYLiGRqm43rcSODblWzqoTZqlQrXjDp6WwxeyGMLANenV3a4JXeNbmW2VKY2iYQvzEl0MjHQKZOqLWKQ-J2-6c1tVy2_HkjpUbUbKTtOF06xYL3cGjVoIPbZywH6omin_NMxQCMouVjLvf3A_P03QqWgINqSh7fRpx9Urh9ec6GTdd-7oeIo6Y-26oIJcJ2vJOPOFFlBJ4og_psr6sapBSjk1DX6rDIqwL0Fcm"
        },
        {
            id: 4,
            title: t('videoPage.v4_title'),
            channel: "Reviewer Việt",
            views: "200K view",
            duration: "12:30",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-6 space-y-8">
                {/* Video Player Section */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group cursor-pointer">
                    <video
                        src="/gif/video_lens.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    />

                    <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider">
                        4K Ultra HD
                    </div>
                </div>

                {/* Video Info */}
                <div className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t('videoPage.title')}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{t('videoPage.views')}</span>
                        <span>•</span>
                        <span>{t('videoPage.daysAgo')}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t('videoPage.desc')}
                    </p>
                </div>

                {/* Product In Video */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-primary uppercase text-sm tracking-wider">
                            {t('videoPage.productTitle')}
                        </h3>
                        <span className="material-symbols-outlined text-gray-400">info</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex gap-4 shadow-sm">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3"
                                alt="Product"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{t('videoPage.productName')}</h4>
                            <p className="text-primary font-bold text-xl mb-3">59.990.000đ</p>
                            <button className="w-full bg-[#E58F10] hover:bg-[#d4840e] text-white font-bold py-2 rounded-lg text-sm uppercase transition-colors shadow-lg shadow-orange-500/20">
                                {t('videoPage.buyNow')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Videos */}
                <div className="space-y-6 pt-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {t('videoPage.related')}
                    </h3>
                    <div className="space-y-4">
                        {relatedVideos.map(video => (
                            <div key={video.id} className="flex gap-4 group cursor-pointer">
                                <div className="w-40 aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 relative">
                                    <img
                                        src={video.image}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">
                                        {video.duration}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                        {video.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-1">{video.channel}</p>
                                    <p className="text-xs text-gray-500">{video.views}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                <div className="max-w-[800px] mx-auto">
                    <button className="w-full h-12 bg-[#E58F10] hover:bg-[#d4840e] text-white font-bold rounded-lg text-base uppercase transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
                        <FaShoppingCart />
                        {t('videoPage.combo')}
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
