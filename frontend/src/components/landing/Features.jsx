import { useLanguage } from "../../context/LanguageContext";

export default function Features() {
    const { t } = useLanguage();

    return (
        <div className="mt-8 py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-12 text-center">
                    {t('features.title')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-4xl">
                                verified_user
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">{t('features.warran')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {t('features.warran_desc')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-4xl">
                                savings
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">{t('features.install')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {t('features.install_desc')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-4xl">
                                rocket_launch
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">{t('features.ship')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {t('features.ship_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
