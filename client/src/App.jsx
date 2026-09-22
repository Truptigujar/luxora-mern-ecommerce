import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shoes from "./pages/Shoes";
import Dresses from "./pages/Dresses";
import Watches from "./pages/Watches";
import Perfumes from "./pages/Perfumes";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Company from "./pages/Company";
import Products from "./pages/Products";
import Offices from "./pages/Offices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/perfumes" element={<Perfumes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}
