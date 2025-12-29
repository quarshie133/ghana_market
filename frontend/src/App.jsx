// src/App.jsx
import { useRef } from 'react';  // ← ADD THIS
import ProductList from './features/products/components/ProductList';
import SellerForm from './features/seller/Components/SellerForm';

function App() {
  const refreshProductsRef = useRef(null);  // ← Create a ref

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navbar unchanged */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        {/* ... your navbar code ... */}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Seller Dashboard */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 sticky top-28 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Seller Dashboard
              </h2>
              {/* Pass the ref so SellerForm can trigger refetch */}
              <SellerForm refreshProductsRef={refreshProductsRef} />
            </div>
          </div>

          {/* Products Marketplace */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              {/* Pass the same ref to ProductList */}
              <ProductList onProductUpload={refreshProductsRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer unchanged */}
      <footer className="mt-24 bg-green-900/95 backdrop-blur-md text-white border-t border-green-800/50">
        {/* ... your footer ... */}
      </footer>
    </div>
  );
}

export default App;