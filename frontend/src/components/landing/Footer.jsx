import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-white dark:bg-gray-950 pt-16 pb-12 px-4 lg:px-8 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo & Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-black tracking-tighter">
                            CameraHub.
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            {t("footer.desc")}
                        </p>
                        <div className="flex flex-col gap-2 mt-2">
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-primary text-lg">
                                    location_on
                                </span>
                                {t("footer.addr")}
                            </p>
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-primary text-lg">
                                    call
                                </span>
                                1900-8888
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg uppercase text-gray-900 dark:text-white mb-6">
                            {t("footer.links")}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.link_home")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.link_new")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.link_news")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.link_promo")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg uppercase text-gray-900 dark:text-white mb-6">
                            {t("footer.support")}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.pol_warranty")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.pol_guide")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.pol_order")}
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block" href="#">
                                    {t("footer.pol_center")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-lg uppercase text-gray-900 dark:text-white mb-6">
                            {t("footer.social")}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            {t("footer.social_desc")}
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-10 mt-16 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        {t("footer.copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
