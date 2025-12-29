// src/features/products/hooks/useProducts.js
import { useState, useEffect } from 'react';
import api from '../../../../../services/api'; // adjust path if needed

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // You can add toast notification here later
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    refetch: fetchProducts, // Important: allows seller to refresh after upload
  };
};