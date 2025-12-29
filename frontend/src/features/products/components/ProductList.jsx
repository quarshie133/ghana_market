// src/features/products/components/ProductList.jsx
import { useProducts } from '../../products/components/hooks/useProducts';
import ProductCard from './ProductCard';

const ProductList = ({ onProductUpload }) => {  // ← Receive callback
  const { products, loading, refetch } = useProducts();

  // Auto-refresh when seller uploads
  if (onProductUpload) {
    // Listen for refresh signal (you can use useEffect + state later)
    onProductUpload.current = refetch;  // Expose refetch via ref
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading Marketplace...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
          Latest Arrivals
        </h2>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
          {products.length} items
        </span>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
          <div className="w-24 h-24 bg-gray-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            🛒
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Be the first seller! Upload products using the dashboard on the left.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;