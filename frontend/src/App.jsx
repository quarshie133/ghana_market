import { useState, useEffect } from 'react';
import api from '../services/api';

function App() {
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]); // Stores the list of items from DB

  // --- EFFECTS ---
  // Load products when the page opens
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    if (image) {
      data.append('image', image);
    }

    try {
      await api.post('/products/create/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Product Uploaded!');
      fetchProducts(); // Refresh the list instantly
      // Reset form (optional)
      setFormData({ name: '', description: '', price: '', stock: '' });
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Upload Failed.');
    }
  };

  // Helper to fix image URLs if they are relative
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Seller Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Seller Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" name="name" placeholder="Product Name" 
                value={formData.name} onChange={handleChange} required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <textarea 
                name="description" placeholder="Description" rows="3"
                value={formData.description} onChange={handleChange} required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" name="price" placeholder="Price" 
                  value={formData.price} onChange={handleChange} required
                  className="w-full border rounded-lg p-3 outline-none"
                />
                <input 
                  type="number" name="stock" placeholder="Qty" 
                  value={formData.stock} onChange={handleChange} required
                  className="w-full border rounded-lg p-3 outline-none"
                />
              </div>
              <input 
                type="file" accept="image/*" onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:bg-green-100 file:text-green-700 file:rounded-full file:px-4 file:py-2 file:border-0"
              />
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
                Upload Product
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer Shop View */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Arrivals</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500">No products yet. Add one!</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-green-600 font-bold text-lg">GHS {product.price}</span>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;