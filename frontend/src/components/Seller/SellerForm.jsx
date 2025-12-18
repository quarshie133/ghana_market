import { useState } from 'react';
import { useShop } from '../../context/ShopContext';

const SellerForm = () => {
  const { uploadProduct } = useShop();
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Loop through state to append data
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    const success = await uploadProduct(data);
    if (success) {
      setFormData({ name: '', description: '', price: '', stock: '' });
      setImage(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Seller Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required 
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"/>
        
        <textarea name="description" placeholder="Description" rows="3" value={formData.description} onChange={handleChange} required 
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"></textarea>
        
        <div className="grid grid-cols-2 gap-2">
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full border rounded-lg p-3 outline-none"/>
          <input type="number" name="stock" placeholder="Qty" value={formData.stock} onChange={handleChange} required className="w-full border rounded-lg p-3 outline-none"/>
        </div>
        
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-sm text-gray-500"/>
        
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default SellerForm;