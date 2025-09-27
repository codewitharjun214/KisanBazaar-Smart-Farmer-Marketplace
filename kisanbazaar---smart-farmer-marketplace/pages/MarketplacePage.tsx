import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product, User, ProductCategory } from '../types';

// Mock data updated with categories
const mockProducts: Product[] = [
  { id: 1, name: 'Organic Tomatoes', price: 40, unit: 'kg', image: 'https://picsum.photos/400/300?image=1080', farmer: 'Suresh Patel', location: 'Nashik, Maharashtra', category: 'Vegetable' },
  { id: 2, name: 'Basmati Rice', price: 120, unit: 'kg', image: 'https://picsum.photos/400/300?image=292', farmer: 'Harpreet Singh', location: 'Amritsar, Punjab', category: 'Grain' },
  { id: 3, name: 'Fresh Paneer', price: 350, unit: 'kg', image: 'https://picsum.photos/400/300?image=993', farmer: 'Meena Devi', location: 'Sonipat, Haryana', category: 'Dairy' },
  { id: 4, name: 'Alphonso Mangoes', price: 800, unit: 'dozen', image: 'https://picsum.photos/400/300?image=1040', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Fruit' },
  { id: 5, name: 'Spinach (Palak)', price: 25, unit: 'bunch', image: 'https://picsum.photos/400/300?image=560', farmer: 'Suresh Patel', location: 'Nashik, Maharashtra', category: 'Vegetable' },
  { id: 6, name: 'Mustard Oil', price: 180, unit: 'litre', image: 'https://picsum.photos/400/300?image=24', farmer: 'Harpreet Singh', location: 'Amritsar, Punjab', category: 'Other' },
  { id: 7, name: 'A2 Milk', price: 70, unit: 'litre', image: 'https://picsum.photos/400/300?image=834', farmer: 'Meena Devi', location: 'Sonipat, Haryana', category: 'Dairy' },
  { id: 8, name: 'Red Onions', price: 30, unit: 'kg', image: 'https://picsum.photos/400/300?image=889', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable' },
];

const categories: ProductCategory[] = ['All', 'Vegetable', 'Fruit', 'Grain', 'Dairy', 'Other'];

interface MarketplacePageProps {
  currentUser: User | null;
  onAddToCart: (product: Product) => void;
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ currentUser, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Marketplace</h1>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search for products, farmers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
         <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        selectedCategory === category
                        ? 'bg-brand-green text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 col-span-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="mt-2 text-xl font-medium text-gray-800">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;