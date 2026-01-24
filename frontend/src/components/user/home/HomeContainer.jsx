import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import NavbarActions from "../../common/NavbarActions";
import Footer from "../../landing/Footer"; // Reusing landing footer

export default function HomeContainer() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1115] transition-colors duration-300">
            {/* User Navbar */}
            <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <NavbarActions className="w-full justify-between" />
                </div>
            </div>

            <main>
                <Hero />
                <Categories />
                <FeaturedProducts />
            </main>

            <Footer />
        </div>
    );
}
