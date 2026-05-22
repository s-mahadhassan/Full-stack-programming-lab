const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['Beds', 'Cabinets', 'Bookcases', 'Boxes', 'Chairs', 'Tables'],
    },
    // Allows identifying rendering location on homepage 
    section: { 
      type: String,
      enum: ['Featured', 'Special', 'Popular', 'HotDeal', 'None'],
      default: 'None'
    },
    // For Hot Deals
    dealText: { type: String },
    dealDiscount: { type: String },
    dealStyle: { type: Number } // e.g., 1 or 2 to match CSS
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
