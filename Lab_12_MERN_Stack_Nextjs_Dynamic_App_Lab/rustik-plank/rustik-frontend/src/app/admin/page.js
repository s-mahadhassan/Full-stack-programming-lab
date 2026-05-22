"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/app/globals.css'; // Make sure tailwind works here specifically

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: 0, oldPrice: 0, image: '/images/rustik_plant.png', category: 'Chairs', section: 'None' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `http://localhost:5000/api/products/${editingId}` : 'http://localhost:5000/api/products';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ title: '', description: '', price: 0, oldPrice: 0, image: '/images/rustik_plant.png', category: 'Chairs', section: 'None' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">Admin Dashboard</h1>
          <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Back to Store</Link>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (£)</label>
              <input type="number" step="0.01" className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Old Price (£)</label>
              <input type="number" step="0.01" className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {['Beds', 'Cabinets', 'Bookcases', 'Boxes', 'Chairs', 'Tables'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Homepage Section</label>
              <select className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.section} onChange={e => setForm({...form, section: e.target.value})}>
                {['None', 'Featured', 'Special', 'Popular', 'HotDeal'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="text" className="w-full border rounded p-2 focus:ring focus:ring-orange-200" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full border rounded p-2 focus:ring focus:ring-orange-200" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required></textarea>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow transition">{editingId ? 'Update Product' : 'Add Product'}</button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ title: '', description: '', price: 0, oldPrice: 0, image: '', category: 'Chairs', section: 'None' });}} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded shadow transition">Cancel</button>}
          </div>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border text-left">Title</th>
                  <th className="py-2 px-4 border text-left">Price</th>
                  <th className="py-2 px-4 border text-left">Category</th>
                  <th className="py-2 px-4 border text-left">Section</th>
                  <th className="py-2 px-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-orange-50 transition border-b">
                    <td className="py-2 px-4 border">{p.title}</td>
                    <td className="py-2 px-4 border">£{p.price}</td>
                    <td className="py-2 px-4 border">{p.category}</td>
                    <td className="py-2 px-4 border">{p.section}</td>
                    <td className="py-2 px-4 border text-center">
                      <button onClick={() => handleEdit(p)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded mr-2 shadow transition">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow transition">Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan="5" className="text-center py-4 text-gray-500">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
