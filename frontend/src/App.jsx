import { ShopProvider } from './context/ShopContext';
import SellerForm from './components/Seller/SellerForm';
import ProductList from './components/Products/ProductList';

function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
        
        {/* Simple Navbar Area */}
        <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black text-green-700 tracking-tighter">
            🇬🇭 GhanaMarket
          </h1>
          <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
            Beta v1.0
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left: Seller Zone */}
          <div className="md:col-span-1">
            <SellerForm />
          </div>

          {/* Right: Buyer Zone */}
          <div className="md:col-span-2">
            <ProductList />
          </div>

        </div>
      </div>
    </ShopProvider>
  );
}

export default App;