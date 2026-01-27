import { useState } from 'react';
import Navbar from "../Navbar";
import Hero from "../Hero";
import BestSellers from "../BestSellers";
import Features from "../Features";
import SpecialOffers from "../SpecialOffers";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import CartButton from "../CartButton";
import AuthModal from "../../auth/AuthModal";

export default function LandingPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
            <Hero onOpenAuthModal={() => setIsAuthModalOpen(true)} />
            <BestSellers />
            <Features />
            <SpecialOffers />
            <Newsletter />
            <Footer />
            <CartButton />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
