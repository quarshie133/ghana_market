// src/features/seller/hooks/useUploadProduct.js
import { useState } from 'react';
import api from '../../../../services/api';

export const useUploadProduct = (onSuccessCallback) => {
  const [uploading, setUploading] = useState(false);

  const uploadProduct = async (formData) => {
    setUploading(true);
    try {
      await api.post('/products/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Call the callback to refresh product list
      if (onSuccessCallback && typeof onSuccessCallback === 'function') {
        onSuccessCallback();
      }

      return true;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('❌ Upload Failed. Please try again.');
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { uploadProduct, uploading };
};