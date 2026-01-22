import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function BestSellers() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useLanguage();

    const categories = [
        {
            id: 1,
            name: t('bestsellers.cat_mirrorless'),
            description: t('bestsellers.desc_mirrorless'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP8kzTiyMKttX2XUJcUxliOUpH9e6CqxQrmaMbXm7SJnv7fKFEC5eD87NQM1i3LNsuKY4s3e92Ml4bS-g3Nslme1O13qi97keCchVDYM2kEZE0O7gFJezlmyAJuxwEFTv-54m7RmjA8LBqWQAbRLgNTi91BVXWDMqhcTIyBG35AKABzHzTvNbe5ygaA9WnV6Jv-h11--BL0jEDOhMoCbJ2S96ZURN33qJqDAUJtx0ybey2JjaLhICKFKlC0Ry5Ui_a4o_HjDyR4D2z",
        },
        {
            id: 2,
            name: t('bestsellers.cat_dslr'),
            description: t('bestsellers.desc_dslr'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyWsWL3h8nA3caqkIZCdPT99BBa3a8CwcAxM0yA5E4aHy_k5iUyHQ8Qx4qM5lujuPLm01wox7kK3yqg6TkakiyD_c_NiGnC-d5Q6w6uy9pFs9bsmeU69QsmFEgDMKvKC54iRWtRP_9LuSHn0OHuUXO03jsv7wNwe6dDxsNm9-XtJp3oMPiGqFFxqdByOt0_gHBJFvCp_50q-Tnzsv844HGsyrexzjb2iMFgsBxQPQuUKNBIj9InfPZHrzkIkQVag6YioTyAQ-LK-L6",
        },
        {
            id: 3,
            name: t('bestsellers.cat_lens'),
            description: t('bestsellers.desc_lens'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7flCVmXFV8qFiVS9jauY_x4ZRJYcSe1wxpvvy4jSsQxmZ4IcVBchJ2OCgyQ3ivlUx5MYp-zbldeGVepV7pPJhMjnzl4OeCOEMp1f3Q2xvvslyhAbx_F3GJYs6LOoRX658Eh7NgxaXm8BZK61YdxfNFqZKQ6VrXRV9Eay4bBZDprVc5QE8aHDMLzgIUR4bskrLOC7zdAcpdIHG19-ONmpPoIS2jog0imH7yMWyz_kyjC9akLA2C7aZ9wh5FjZOT4aq-xji7dOe7G5m",
        },
        {
            id: 4,
            name: t('bestsellers.cat_compact'),
            description: t('bestsellers.desc_compact'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3", // Placeholder (using A7IV image for now as generic camera)
        },
        {
            id: 5,
            name: t('bestsellers.cat_cinema'),
            description: t('bestsellers.desc_cinema'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvi7bVaBDbgyPwG3NB2LO9QobXh5Jl5Gimy3tiqfzgj2Ah0MdUUtuIzZ3eA4S7NLfwUyONjuU8gCmZ6xv9zztThcI5zRk7SMn_8SsLilC27Xpl4a9XkiOlfn-GVzrfeubTx3W_YMI6woI_nynqCKJ8vHDX7hv2U4vG6FlSMGMyAaEe8MR4Rwh1YMxu-YUAHbsMppD6b7UWFe-ad7M_0AJhz5IrWawkw--tlXbo78nS_RMn3LHv5pDl7c62G1v8lseSpAO_Oz7mEuh3", // Placeholder
        },
        {
            id: 6,
            name: t('bestsellers.cat_acc'),
            description: t('bestsellers.desc_acc'),
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrkrlXLExB25Vo7bW0EUR0nSC152jG5Mh6IsowsS2LGmgavV_7Z9VGep5CfYgMRBqqtecX5a7uoEYjBTEBo0Fh0Bk25tdBFDgQlNohYngOHDj3Be1JZFLhNgScYJwGteQDF-Iaw2BL8q3cPX2z2XbzyTdDbDbkcakwtK-rchr6mqjelXgBBYzt3wdD6EakSfpuf9vuMstGkqVYiZ0OgRdBCJXRhOaRcIb7e-1Ggep8LCdrYWu8GPW9Uy7VNrEyAmIQWf06fJpYG-k", // Used grip image
        }
    ];

    const visibleCategories = isExpanded ? categories : categories.slice(0, 3);

    return (
        <div id="bestsellers" className="max-w-[1440px] mx-auto space-y-8 lg:py-16">
            <div className="flex justify-between items-end px-4 lg:px-8">
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">
                    {t('bestsellers.title')}
                </h2>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary text-base font-medium hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                >
                    {isExpanded ? t('bestsellers.collapse') : t('bestsellers.viewAll')}
                    <span className="material-symbols-outlined text-lg transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        {isExpanded ? "expand_less" : "arrow_forward"}
                    </span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-4 lg:px-8">
                {visibleCategories.map((category) => (
                    <div key={category.id} className="flex flex-col items-center gap-4 group cursor-pointer animate-fade-in">
                        <div className="w-full aspect-[4/3] bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center p-4 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:border-primary/50 group-hover:shadow-xl transition-all relative overflow-hidden">
                            <div
                                className="w-full h-full bg-contain bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-500"
                                style={{
                                    backgroundImage: `url('${category.image}')`,
                                }}
                            ></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-base lg:text-xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
