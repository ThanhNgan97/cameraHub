import { useLanguage } from "../../context/LanguageContext";

export default function Newsletter() {
    const { t } = useLanguage();

    return (
        <div id="newsletter" className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16">
            <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden isolate">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-primary mb-6">
                        mark_email_unread
                    </span>
                    <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
                        {t('newsletter.title')}
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        {t('newsletter.desc')}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            className="w-full h-14 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                            placeholder={t('newsletter.placeholder')}
                            type="email"
                        />
                        <button
                            className="w-full sm:w-auto px-10 h-14 rounded-xl bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 whitespace-nowrap"
                            type="button"
                        >
                            {t('newsletter.btn')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
