// src/features/checkout/hooks/useBuyProduct.js
import { useState } from 'react';
import api from '../../../../services/api';

export const useBuyProduct = () => {
  const [buying, setBuying] = useState(false);

  const buyProduct = async (product, customerData) => {
    if (!customerData?.name || !customerData?.phone) {
      alert('Please provide name and phone number');
      return;
    }

    setBuying(true);
    try {
      const response = await api.post('/orders/create/', {
        product_id: product.id,
        customer_name: customerData.name,
        customer_phone: customerData.phone,
      });

      // This will change when we add real Hubtel
      alert(
        `🎉 Payment Request Sent!\nCheck your phone to approve GHS ${product.price}\nOrder ID: ${response.data.order_id || 'pending'}`
      );

      return response.data;
    } catch (error) {
      console.error('Buy failed:', error);
      alert('❌ Payment initiation failed. Try again.');
    } finally {
      setBuying(false);
    }
  };

  return { buyProduct, buying };
};