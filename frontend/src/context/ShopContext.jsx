import { createContext, useState, useEffect, useContext } from 'react';
import api from '../../services/api';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Products on Startup
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // 2. Upload Logic
  const uploadProduct = async (formData) => {
    try {
      await api.post('/products/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Product Uploaded!');
      fetchProducts(); // Refresh list automatically
      return true; // Success
    } catch (error) {
      console.error(error);
      alert('❌ Upload Failed.');
      return false; // Failed
    }
  };

  // 3. Buy Logic (Mock Payment)
  const buyProduct = async (product) => {
    const customerName = prompt("Enter your Name:");
    if (!customerName) return;

    const customerPhone = prompt("Enter your Momo Number:");
    if (!customerPhone) return;

    try {
      const response = await api.post('/orders/create/', {
        product_id: product.id,
        customer_name: customerName,
        customer_phone: customerPhone
      });
      alert(`🎉 Payment Successful!\nOrder ID: ${response.data.order_id}\nAmount: GHS ${response.data.amount_paid}`);
    } catch (error) {
      console.error(error);
      alert("❌ Payment Failed.");
    }
  };

  return (
    <ShopContext.Provider value={{ products, loading, uploadProduct, buyProduct }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom Hook for easy access
export const useShop = () => useContext(ShopContext);