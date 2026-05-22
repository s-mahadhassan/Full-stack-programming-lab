const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.section) query.section = req.query.section;

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public (in real app, this should be Private/Admin)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, oldPrice, image, category, section, dealText, dealDiscount, dealStyle } = req.body;
    const product = new Product({
      title,
      description,
      price,
      oldPrice,
      image,
      category,
      section,
      dealText,
      dealDiscount,
      dealStyle
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (in real app, this should be Private/Admin)
const updateProduct = async (req, res) => {
  try {
    const { title, description, price, oldPrice, image, category, section, dealText, dealDiscount, dealStyle } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.oldPrice = oldPrice !== undefined ? oldPrice : product.oldPrice;
      product.image = image || product.image;
      product.category = category || product.category;
      product.section = section || product.section;
      product.dealText = dealText !== undefined ? dealText : product.dealText;
      product.dealDiscount = dealDiscount !== undefined ? dealDiscount : product.dealDiscount;
      product.dealStyle = dealStyle !== undefined ? dealStyle : product.dealStyle;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (in real app, this should be Private/Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
