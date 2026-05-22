"use client";

import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function EcommerceStorefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Fetch products from backend api
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) {
        throw new Error("Failed to communicate with API server");
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.value || []);
      setProducts(items);
      setFilteredProducts(items);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(
        "Could not load products. Please check if your MongoDB service and Backend Node.js server are active on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // Seed the database from frontend
  const seedDatabase = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/seed");
      if (!res.ok) {
        throw new Error("Failed to seed database via API");
      }
      const result = await res.json();
      showToast(`Database Seeding Complete! Loaded ${result.count} premium products.`, "success");
      await fetchProducts();
    } catch (err: any) {
      console.error("Seeding error:", err);
      showToast("Seeding failed. Make sure your backend server is running on port 5000.", "info");
      setError("Database seeding failed. Please make sure backend server is active.");
      setLoading(false);
    }
  };

  // Show dynamic toast toast alerts
  const showToast = (message: string, type: "success" | "info" = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category and search query
  useEffect(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`"${product.name}" added to cart!`, "success");
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Return realistic custom SVG vectors depending on category/name
  const getProductSVG = (name: string) => {
    if (name.includes("Keyboard") || name.includes("Mechanical")) {
      return (
        <svg viewBox="0 0 100 60" className="w-full h-32 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="15" width="90" height="30" rx="4" className="stroke-cyan-500/40 fill-cyan-950/20" />
          <rect x="8" y="18" width="84" height="24" rx="2" className="stroke-cyan-400" />
          <path d="M 12 22 H 16 M 20 22 H 24 M 28 22 H 32 M 36 22 H 40 M 44 22 H 48 M 52 22 H 56 M 60 22 H 64 M 68 22 H 72 M 76 22 H 80 M 84 22 H 88" strokeLinecap="round" />
          <path d="M 12 28 H 16 M 20 28 H 24 M 28 28 H 32 M 36 28 H 40 M 44 28 H 48 M 52 28 H 56 M 60 28 H 64 M 68 28 H 72 M 76 28 H 80 M 84 28 H 88" strokeLinecap="round" />
          <path d="M 12 34 H 18 M 22 34 H 26 M 30 34 H 70 M 74 34 H 78 M 82 34 H 88" strokeLinecap="round" />
          {/* Neon key highlights */}
          <circle cx="14" cy="22" r="1.5" className="fill-cyan-400 stroke-none animate-pulse" />
          <circle cx="86" cy="34" r="1.5" className="fill-pink-500 stroke-none animate-pulse" />
        </svg>
      );
    } else if (name.includes("Monitor") || name.includes("Screen")) {
      return (
        <svg viewBox="0 0 100 60" className="w-full h-32 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 12 C 30 8, 70 8, 90 12 L 85 40 C 65 37, 35 37, 15 40 Z" className="stroke-indigo-500/40 fill-indigo-950/20" />
          <path d="M 12 14 C 30 10.5, 70 10.5, 88 14 L 83 38 C 65 35, 35 35, 17 38 Z" className="stroke-indigo-400" />
          <path d="M 42 40 L 38 52 H 62 L 58 40" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 30 52 H 70" strokeLinecap="round" />
        </svg>
      );
    } else if (name.includes("Chair") || name.includes("Furniture")) {
      return (
        <svg viewBox="0 0 100 60" className="w-full h-32 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 35 10 H 65 V 32 H 35 Z" rx="3" className="stroke-amber-500/40 fill-amber-950/20" />
          <path d="M 30 32 H 70 V 38 H 30 Z" rx="2" className="stroke-amber-400" />
          <path d="M 48 38 V 48 L 36 54 M 48 48 L 64 54 M 48 44 H 52" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 30 20 H 34 V 28 H 30 Z M 66 20 H 70 V 28 H 66 Z" rx="1" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 60" className="w-full h-32 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="32" cy="30" r="12" className="stroke-pink-500/40 fill-pink-950/20" />
          <circle cx="68" cy="30" r="12" className="stroke-pink-500/40 fill-pink-950/20" />
          <path d="M 32 18 C 32 10, 68 10, 68 18" strokeLinecap="round" strokeWidth="2" />
          <rect x="29" y="24" width="6" height="12" rx="1.5" className="stroke-pink-400 fill-pink-500" />
          <rect x="65" y="24" width="6" height="12" rx="1.5" className="stroke-pink-400 fill-pink-500" />
          <path d="M 32 30 A 8 8 0 0 0 48 38 H 52 A 8 8 0 0 0 68 30" strokeLinecap="round" />
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#07060e] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Visual glowing aura elements in background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce flex items-center gap-3 bg-zinc-900/90 border-2 border-cyan-500/50 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.25)]">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <p className="text-sm font-semibold text-white tracking-wide">{notification.message}</p>
        </div>
      )}

      {/* Premium Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/40 bg-zinc-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              HT
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-cyan-400 bg-clip-text text-transparent">
                HASSAN TECH
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500">STUDENT PROFILE INJECTED</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={seedDatabase}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-800/50 text-cyan-400 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l-3 3m3-3l3 3" />
              </svg>
              Seed DB Schema
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80 text-zinc-300 transition-all duration-300 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-black text-white shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-10">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <span className="self-center md:self-start px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 uppercase">
              Lab 11: MERN Decoupled Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Next-Gen <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Ecommerce</span> Workspace
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Experience dynamic full-stack integration connecting React (Next.js) with local Node/Express sockets and MongoDB. Custom workspace configurations, structured schemas, and active seeding processes.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-xl font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Backend: Port 5000
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-xl font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                MongoDB: Connected
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-sm md:max-w-xs bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">FEATURED EXCLUSIVE ITEM</span>
            <div className="flex justify-center py-2">
              {getProductSVG("Mahad's Premium Mechanical Keyboard Pro")}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Mahad's Premium Mechanical Keyboard Pro</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">SKU: 232053-BSSE-6A</p>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4">
              <span className="text-emerald-400 font-black text-xl">$189.99</span>
              <button
                onClick={() => {
                  const keyboard = products.find(p => p.name.includes("Keyboard"));
                  if (keyboard) {
                    addToCart(keyboard);
                  } else {
                    showToast("Please Seed DB to enable items first!", "info");
                  }
                }}
                className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Filters & Search Row */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/40 border border-zinc-900 p-4 rounded-2xl backdrop-blur-sm">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search active catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm placeholder-zinc-500 text-white focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 border ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-bold shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                    : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:border-zinc-700/80 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Catalog Showcase (Grid Workspace) */}
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm font-semibold tracking-wide">Syncing catalog from database socket...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center border-2 border-dashed border-red-500/20 bg-red-950/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-5 max-w-xl mx-auto">
            <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white">Database Offline</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{error}</p>
            </div>
            <button
              onClick={seedDatabase}
              className="text-xs font-bold px-5 py-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-all font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              Automatically Setup & Seed database
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-3">
            <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-zinc-400 text-sm font-semibold">No active products match your search/filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-cyan-400 font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isSpecialKeyboard = product.name.includes("Keyboard");
              return (
                <div
                  key={product._id}
                  className={`relative group bg-zinc-900/30 backdrop-blur-md rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(99,102,241,0.08)] flex flex-col justify-between overflow-hidden ${
                    isSpecialKeyboard
                      ? "border-cyan-500/30 hover:border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.05)] bg-[#070e17]/30"
                      : "border-zinc-800/80 hover:border-indigo-500/40"
                  }`}
                >
                  {/* Subtle lighting strip on top of special item */}
                  {isSpecialKeyboard && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500" />
                  )}

                  {/* Product Header / Category */}
                  <div className="p-6 pb-0 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase border ${
                          isSpecialKeyboard
                            ? "bg-cyan-950/50 text-cyan-400 border-cyan-500/30"
                            : "bg-zinc-900 text-zinc-400 border-zinc-800"
                        }`}
                      >
                        {product.category}
                      </span>
                      {isSpecialKeyboard && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                      )}
                    </div>

                    {/* Vector Graphic Container */}
                    <div className="h-32 flex items-center justify-center bg-zinc-950/50 rounded-xl border border-zinc-900/60 p-2 overflow-hidden group-hover:bg-zinc-950/80 transition-colors">
                      {getProductSVG(product.name)}
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-zinc-100 group-hover:text-cyan-400 transition-colors mt-2 line-clamp-1 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5 uppercase tracking-wide">
                        {isSpecialKeyboard ? "Hassan Tech Exclusive" : "Studio standard hardware"}
                      </p>
                    </div>

                    <p className="text-zinc-400 text-xs mt-2 line-clamp-3 leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Footer Actions */}
                  <div className="p-6 pt-4 flex flex-col gap-3.5 mt-auto">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Regional MSRP</span>
                      <span className="text-2xl font-black text-emerald-400 tracking-tight">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/40">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-semibold px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all font-semibold"
                      >
                        Specs Sheet
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className={`text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-1.5 shadow-md ${
                          isSpecialKeyboard
                            ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-950/50"
                            : "bg-zinc-100 text-black hover:bg-white"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      {/* Product Specification Sheet Drawer (Sidebar) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-[#090812] border-l border-zinc-800/80 p-8 flex flex-col justify-between shadow-2xl z-10 animate-fade-in-right overflow-y-auto">
            {/* Close trigger */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Spec Content */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full uppercase self-start">
                {selectedProduct.category}
              </span>

              <div className="mt-2">
                <h3 className="text-2xl font-black text-white leading-tight">{selectedProduct.name}</h3>
                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-1">PRODUCT SPECIFICATION CATALOG</p>
              </div>

              <div className="my-2 bg-zinc-950/80 rounded-2xl p-4 border border-zinc-900 flex justify-center">
                {getProductSVG(selectedProduct.name)}
              </div>

              {/* Specifications List */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-850 pb-2">Technical Parameters</h4>
                
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-500 font-medium">Inventory Identifier</span>
                    <span className="font-mono text-zinc-300 select-all">{selectedProduct._id}</span>
                  </div>
                  {selectedProduct.name.includes("Keyboard") && (
                    <>
                      <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500 font-medium">Manufacturer / Brand</span>
                        <span className="text-cyan-400 font-semibold">Hassan Tech</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500 font-medium">Profile SKU/Serial</span>
                        <span className="text-cyan-400 font-mono font-semibold select-all">232053-BSSE-6A</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500 font-medium">Layout Standards</span>
                        <span className="text-zinc-300 font-medium">75% ANSI mechanical keyboard</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                        <span className="text-zinc-500 font-medium">Switch Sockets</span>
                        <span className="text-zinc-300 font-medium">Full hot-swap tactile switches</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-500 font-medium">Storage Socket</span>
                    <span className="text-zinc-300 font-medium">Active database driver MERN</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-500 font-medium">Response Socket</span>
                    <span className="text-zinc-300 font-medium">JSON REST aggregation</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Description</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium bg-zinc-950/40 p-4 rounded-xl border border-zinc-900">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-zinc-900 pt-6 mt-8 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-zinc-500 text-xs font-semibold">Total Unit MSRP</span>
                <span className="text-3xl font-black text-emerald-400 tracking-tight">${selectedProduct.price.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full font-bold py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add this item to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer (Sidebar) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-[#090812] border-l border-zinc-800/80 p-8 flex flex-col justify-between shadow-2xl z-10 animate-fade-in-right overflow-y-auto">
            {/* Close trigger */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Cart Content */}
            <div className="flex flex-col gap-6 h-full justify-between">
              <div>
                <div className="mt-2">
                  <h3 className="text-2xl font-black text-white leading-tight">Your Cart</h3>
                  <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-1">STOREFRONT BASKET SELECTIONS</p>
                </div>

                {cart.length === 0 ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
                    <svg className="w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p className="text-zinc-500 text-sm font-semibold">Your shopping cart is currently empty.</p>
                    <p className="text-zinc-600 text-xs max-w-xs leading-relaxed">Browse the developer workstation catalog and click "Add" to include premium gear here.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 mt-8 overflow-y-auto max-h-[60vh] pr-2">
                    {cart.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center justify-between bg-zinc-950/60 p-4 rounded-2xl border border-zinc-900 group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 p-1">
                            {getProductSVG(item.product.name)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-zinc-500 font-semibold mt-0.5">
                              ${item.product.price.toFixed(2)} &times; {item.quantity}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="p-1.5 rounded-lg hover:bg-zinc-900 hover:text-red-400 text-zinc-600 transition-all"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal summary */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-900 pt-6 mt-auto flex flex-col gap-4">
                  <div className="flex justify-between text-sm border-b border-zinc-900 pb-3">
                    <span className="text-zinc-500 font-semibold">Selected items count</span>
                    <span className="text-zinc-300 font-mono font-bold">{cartItemsCount} units</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-zinc-400 font-bold text-sm">Aggregate Subtotal</span>
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      setCart([]);
                      setIsCartOpen(false);
                      showToast("Checkout simulated! Your order was successfully processed.", "success");
                    }}
                    className="w-full font-bold py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2"
                  >
                    Proceed to Simulated Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Styled Footer */}
      <footer className="mt-auto border-t border-zinc-900/60 bg-zinc-950/20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-medium">
            &copy; {new Date().getFullYear()} Hassan Tech Hardware. All rights reserved. MERN Ecommerce Decoupled Lab.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500">
            <span>DEVELOPER: MAHAD HASSAN</span>
            <span className="text-zinc-800">|</span>
            <span>SKU/SERIAL: 232053-BSSE-6A</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
