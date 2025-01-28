const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin şeması
const adminSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
});

const Admin = mongoose.model('Admin', adminSchema);

// Ürün şeması
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Product = mongoose.model('Product', productSchema);

// Admin login endpoint (JWT)
app.post('/pages/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  
  if (!admin) return res.status(404).send('Admin bulunamadı');
  
  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  
  if (!isPasswordValid) return res.status(401).send('Yanlış şifre');
  
  const token = jwt.sign({ id: admin._id, role: admin.role }, 'secret_key');
  res.json({ token });
});

// Ürün ekleme
app.post('/pages/api/products/add', async (req, res) => {
  const { name, description, price, imageUrl, category, stock } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    imageUrl,
    category,
    stock,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  await newProduct.save();
  res.json(newProduct);
});

// Ürün silme
app.delete('/pages/api/products/delete', async (req, res) => {
  const { id } = req.body;
  await Product.findByIdAndDelete(id);
  res.send('Ürün silindi');
});

// Tüm ürünleri getir
app.get('/pages/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(3000, () => {
  console.log('Server çalışıyor');
});
