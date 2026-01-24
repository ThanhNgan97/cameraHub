import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full h-[500px] lg:h-[600px] bg-black overflow-hidden group">
            {/* Background Image - Placeholder */}
            <div className="absolute inset-0">
                <img
                    src="/gif/lens_gif3.gif"
                    alt="Sony Alpha A7 V"
                    className="w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-[1440px] mx-auto px-4 lg:px-8 flex items-center">
                <div className="max-w-2xl space-y-6 animate-fade-in-up">
                    <span className="inline-block bg-[#F59E0B] text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider mb-2">
                        {t('home.hero_badge')}
                    </span>

                    <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none mb-4">
                        {t('home.hero_title')}
                    </h1>

                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mb-8 font-medium">
                        {t('home.hero_desc')}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="h-12 px-8 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-lg transition-all flex items-center gap-2 text-sm uppercase tracking-wide transform hover:-translate-y-1 shadow-lg shadow-orange-500/20">
                            {t('home.hero_buy')} <FaArrowRight />
                        </button>

                        <button className="h-12 px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:border-white/40 transition-all text-sm uppercase tracking-wide backdrop-blur-sm">
                            {t('home.hero_view')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
