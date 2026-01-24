import { FaThLarge } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function Categories() {
    const { t } = useLanguage();

    const categories = [
        {
            id: 'mirrorless',
            name: t('home.cat_mirrorless'),
            image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=200&auto=format&fit=crop', // Mirrorless placeholder
        },
        {
            id: 'dslr',
            name: t('home.cat_dslr'),
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop', // DSLR placeholder
        },
        {
            id: 'lens',
            name: t('home.cat_lens'),
            image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=200&auto=format&fit=crop', // Lens placeholder
        },
        // {
        //     id: 'accessories',
        //     name: t('home.cat_accessories'),
        //     image: 'https://images.unsplash.com/photo-1554625297-b8a536968ce6?q=80&w=200&auto=format&fit=crop', // Accessories/Plant placeholder to match design
        // },
        {
            id: 'all',
            name: t('home.cat_all'),
            icon: <FaThLarge className="text-2xl text-gray-400 group-hover:text-[#F59E0B] transition-colors" />, // All icon
            isIcon: true
        }
    ];

    return (
        <section className="py-12 bg-white dark:bg-[#0f1115]">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {t('home.cat_title')}
                    </h2>
                    <a href="#" className="text-sm font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors flex items-center gap-1">
                        {t('home.cat_view_all')} &rsaquo;
                    </a>
                </div>

                {/* Categories Grid */}
                <div className="flex flex-wrap justify-start gap-8 lg:gap-20">
                    {categories.map((cat) => (
                        <div key={cat.id} className="group flex flex-col items-center gap-4 cursor-pointer min-w-[120px]">
                            <div className={`w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 border-2 ${cat.isIcon ? 'bg-gray-100 dark:bg-gray-800 border-transparent group-hover:border-[#F59E0B]' : 'border-transparent group-hover:scale-105 group-hover:shadow-lg'}`}>
                                {cat.isIcon ? (
                                    cat.icon
                                ) : (
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <span className="text-xs lg:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-[#F59E0B] transition-colors">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
