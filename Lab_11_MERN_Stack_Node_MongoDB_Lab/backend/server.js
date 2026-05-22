const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Next.js frontend (default dev port is 3000)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// MongoDB connection string pointing to local instance
const MONGODB_URI = 'mongodb://127.0.0.1:27017/ecommerce_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Semantic Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

// GET /api/seed - Drops existing collection and inserts 4 realistic product items (includes personalized student identity)
app.get('/api/seed', async (req, res) => {
  try {
    // Drop existing products
    await Product.deleteMany({});
    
    // Seed 4 premium products
    const seedProducts = [
      {
        name: "Mahad's Premium Mechanical Keyboard Pro",
        description: "Hassan Tech premium mechanical keyboard designed for professional developers and typing enthusiasts. Outfitted with high-durability mechanical switches, hot-swappable sockets, premium keycaps, and customizable RGB lighting. SKU/Serial: 232053-BSSE-6A.",
        price: 189.99,
        category: "Electronics"
      },
      {
        name: "Ultra-Wide Curved Gaming Monitor 34\"",
        description: "Immersive curved screen featuring high refresh rate (165Hz), stunning QHD resolution, HDR400, and ultra-thin bezels for a premium workstation or gaming setup.",
        price: 499.99,
        category: "Electronics"
      },
      {
        name: "Ergonomic Office Chair Elite",
        description: "High-end ergonomic task chair offering full-body alignment, 3D adjustable armrests, active lumbar support, and breathable mesh backrest.",
        price: 329.50,
        category: "Furniture"
      },
      {
        name: "Studio Reference Wireless Headphones",
        description: "Professional-grade active noise-cancelling headphones featuring studio sound quality, plush memory foam ear cups, and up to 45 hours of battery life.",
        price: 249.00,
        category: "Audio"
      }
    ];

    const insertedProducts = await Product.insertMany(seedProducts);
    
    res.status(201).json({
      message: "Database successfully seeded!",
      count: insertedProducts.length,
      products: insertedProducts
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Database seeding failed', details: error.message });
  }
});

// GET /api/products - Queries the database and outputs the full catalog
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
  }
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Ecommerce backend API is running. Hit /api/products or /api/seed');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
