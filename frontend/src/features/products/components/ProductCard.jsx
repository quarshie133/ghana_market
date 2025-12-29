// src/features/products/components/ProductCard.jsx
import { useBuyProduct } from '../../checkout/hooks/useBuyProduct';

const ProductCard = ({ product }) => {
  const { buyProduct, buying } = useBuyProduct();

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300x300?text=No+Image';
    return path.startsWith('http') ? path : `http://127.0.0.1:8000${path}`;
  };

  const handleBuy = () => {
    const name = prompt("Enter your Name:");
    if (!name?.trim()) return;
    
    const phone = prompt("Enter your Momo Number (e.g., 233241234567):");
    if (!phone?.trim()) return;

    buyProduct(product, { name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <img 
        src={getImageUrl(product.image)} 
        alt={product.name} 
        className="w-full h-64 object-cover"
        onError={(e) => e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error'}
      />
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {product.description || 'No description'}
        </p>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div>
            <span className="text-3xl font-black text-green-600">
              GHS {Number(product.price).toFixed(2)}
            </span>
            {product.stock < 5 && (
              <span className="block text-xs text-red-600 mt-1">
                Only {product.stock} left!
              </span>
            )}
          </div>
          
          <button
            onClick={handleBuy}
            disabled={buying}
            className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-70"
          >
            {buying ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;