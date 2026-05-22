import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Unified product data representing brand hot spring spas
const SPA_PRODUCTS = [
  {
    id: 1,
    name: "XS SCYBA X SERUES 119",
    brand: "Oceanic",
    price: 500.00,
    description: "The goods of our stores are very reliable and dur we care about the customer",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 2,
    name: "Barrier Reef Premium 158",
    brand: "Hotspring",
    price: 4899.00,
    description: "Extra Large and Deep 8 Person 158 Jet Supper Spa, TV-Home Theater Spa System",
    image: "https://images.unsplash.com/photo-1572331165267-854da2ba12fb?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 3,
    name: "Caldera Hawaii Spa 200",
    brand: "Caldera",
    price: 1200.00,
    description: "Compact and powerful 4 person tub with precision hydrotherapy jets",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 4,
    name: "Oceanic Pearl 6 Person",
    brand: "Oceanic",
    price: 2499.00,
    description: "Spacious family spa with premium LED waterfalls and dual loungers",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 5,
    name: "Island Breeze TV Theater",
    brand: "Island",
    price: 3500.00,
    description: "Surround sound premium spa featuring multi-jet hydrotherapy shell",
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 6,
    name: "Hotspring Limelight Prism",
    brand: "Hotspring",
    price: 6200.00,
    description: "Our flagship 7 person spa with luxurious high-performance jet arrangements",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 7,
    name: "Jetsetter LX Portable",
    brand: "Hotspring",
    price: 1850.00,
    description: "A highly portable three-person hot tub for cozy relaxing retreats",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 8,
    name: "Highlife Envoy Hydro",
    brand: "Caldera",
    price: 5400.00,
    description: "Energy efficient premium spa featuring wireless remote controller screen",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400&h=300"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Add item to cart
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  // Update item quantity
  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? { ...item, qty: newQty } : item)
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="d-flex flex-column align-items-center w-100 min-vh-100 bg-secondary-subtle">
        {/* Core Navbar */}
        <Navbar cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Main Content Area */}
        <main className="container main-content-wrapper p-0 mt-3 rounded overflow-hidden">
          <Routes>
            <Route 
              path="/" 
              element={<Home products={SPA_PRODUCTS} onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/products" 
              element={
                <Products 
                  products={SPA_PRODUCTS} 
                  onAddToCart={handleAddToCart} 
                  searchQuery={searchQuery} 
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  onUpdateQty={handleUpdateQty} 
                  onRemoveFromCart={handleRemoveFromCart} 
                  onClearCart={handleClearCart} 
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Core Footer */}
        <Footer />
      </div>
    </Router>
  );
}
