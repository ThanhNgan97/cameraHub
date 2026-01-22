import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div id="hero" className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-8 pb-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
                    <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded text-sm font-bold text-primary uppercase tracking-wider">
                        {t('hero.newArrival')}
                    </span>
                    <h1 className="text-text-light dark:text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight uppercase">
                        {t('hero.titlePart1')} <br />
                        <span className="text-primary">{t('hero.titlePart2')}</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-base lg:text-xl font-light max-w-lg leading-relaxed">
                        {t('hero.description')}
                    </p>
                    <div className="flex gap-4 pt-2">
                        <button className="flex items-center justify-center h-14 px-8 bg-primary text-white text-base font-bold tracking-wide uppercase rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all">
                            {t('hero.explore')}
                        </button>
                        <button
                            onClick={() => navigate('/video')}
                            className="flex items-center justify-center h-14 px-8 border border-gray-300 dark:border-gray-600 text-text-light dark:text-white text-base font-bold tracking-wide uppercase rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                        >
                            {t('hero.watchVideo')}
                        </button>
                    </div>
                </div>
                <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 group">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                        alt="Sony Alpha Camera"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        src="/gif/gifsony.gif"
                    />
                </div>
            </div>
        </div>
    );
}
