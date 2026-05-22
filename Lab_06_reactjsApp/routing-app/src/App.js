import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productTitle) => {
    setCart(prev => [...prev, productTitle]);
    console.log(`${productTitle} committed to shopping cart.`);
  };

  return (
    <BrowserRouter>
      <div className="global-site-container">
        <header className="global-header">
          <Navbar cartCount={cart.length} />
        </header>

        <main className="global-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="global-footer">
          <p>© 2026 CoreTech Enterprise Systems. Built for Full Stack Programming Lab 06.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;