// src/features/seller/components/SellerForm.jsx
import { useRef } from 'react';
import { useUploadProduct } from '../hooks/useUploadProduct';

const SellerForm = ({ refreshProductsRef }) => {  // ← Receive the ref
  const formRef = useRef();
  const { uploadProduct, uploading } = useUploadProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const success = await uploadProduct(formData);
    
    if (success) {
      formRef.current?.reset();
      
      // Trigger product list refresh
      if (refreshProductsRef?.current && typeof refreshProductsRef.current === 'function') {
        refreshProductsRef.current();
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Your form fields - keep exactly as before */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
        <input name="name" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" placeholder="e.g., Fresh Tilapia" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price (GHS)</label>
        <input name="price" type="number" step="0.01" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" placeholder="25.50" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea name="description" rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 resize-none" placeholder="Fresh from Volta Lake..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <input name="image" type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
        <input name="stock" type="number" min="1" defaultValue="1" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" />
      </div>
      
      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-70 transition-all"
      >
        {uploading ? 'Uploading...' : '🚀 Upload Product'}
      </button>
    </form>
  );
};

export default SellerForm;