import { useShop } from '../../context/ShopContext';

const ProductCard = ({ product }) => {
  const { buyProduct } = useShop();

  // Helper for image URLs
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/150';
    return path.startsWith('http') ? path : `http://127.0.0.1:8000${path}`;
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100">
      <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-green-600 font-bold text-lg">GHS {product.price}</span>
          <button 
            onClick={() => buyProduct(product)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition transform active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;