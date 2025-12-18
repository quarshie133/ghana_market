import { useShop } from '../../context/ShopContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products, loading } = useShop();

  if (loading) return <div className="text-center p-10">Loading Marketplace...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Arrivals</h2>
      
      {products.length === 0 ? (
        <div className="text-gray-500 bg-white p-8 rounded-lg text-center">
          No products found. Be the first to sell!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;