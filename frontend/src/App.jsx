import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/video/LandingPage";
import VideoPage from "./components/landing/video/VideoPage";
import HomeContainer from "./components/user/home/HomeContainer";
import ProductPage from "./components/user/products/ProductPage";

import ProductDetail from "./components/user/product_details/ProductDetail";
import CartPage from "./components/user/cart/CartPage";
import AddressSelection from "./components/user/checkout/AddressSelection";
import CheckoutPage from "./components/user/checkout/CheckoutPage";
import UserProfile from "./components/user/profile/UserProfile";
import PersonalProfile from "./components/user/profile/PersonalProfile";
import EditProfile from "./components/user/profile/EditProfile";
import ChangePassword from "./components/user/profile/ChangePassword";
import { AuthProvider } from "./context/AuthContext";

import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import OAuthSuccess from "./components/auth/OAuthSuccess";
import SearchResults from "./components/user/SearchResults";
import TestProductSpecs from "./components/TestProductSpecs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/user/home" element={<HomeContainer />} />
          <Route path="/user/products" element={<ProductPage />} />
          <Route path="/user/products/:id" element={<ProductDetail />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/checkout" element={<CheckoutPage />} />
          <Route path="/user/checkout/address" element={<AddressSelection />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/edit" element={<PersonalProfile />} />
          <Route path="/user/profile/info" element={<EditProfile />} />
          <Route path="/user/profile/password" element={<ChangePassword />} />
          <Route path="/test-specs" element={<TestProductSpecs />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
