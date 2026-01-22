import Navbar from "../Navbar";
import Hero from "../Hero";
import BestSellers from "../BestSellers";
import Features from "../Features";
import SpecialOffers from "../SpecialOffers";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import CartButton from "../CartButton";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <BestSellers />
            <Features />
            <SpecialOffers />
            <Newsletter />
            <Footer />
            <CartButton />
        </>
    );
}
