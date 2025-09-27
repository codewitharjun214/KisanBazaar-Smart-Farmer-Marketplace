
import React from 'react';
import type { User, Product } from '../types';

interface DashboardPageProps {
  user: User;
}

// Mock data for the logged-in farmer
const farmerProducts: Product[] = [
    // FIX: Property 'category' is missing in type '{ id: number; name: string; price: number; unit: string; image: string; farmer: string; location: string; }' but required in type 'Product'.
    { id: 4, name: 'Alphonso Mangoes', price: 800, unit: 'dozen', image: 'https://picsum.photos/400/300?image=1040', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Fruit' },
    // FIX: Property 'category' is missing in type '{ id: number; name: string; price: number; unit: string; image: string; farmer: string; location: string; }' but required in type 'Product'.
    { id: 8, name: 'Red Onions', price: 30, unit: 'kg', image: 'https://picsum.photos/400/300?image=889', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable' },
];

const ProductRow: React.FC<{product: Product}> = ({ product }) => (
    <div className="grid grid-cols-6 gap-4 items-center p-3 border-b hover:bg-gray-50">
        <div className="col-span-2 flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
            <span className="font-medium">{product.name}</span>
        </div>
        <div className="text-gray-600">₹{product.price} / {product.unit}</div>
        <div className="text-gray-600">120 units</div>
        <div className="text-green-600 font-semibold">Active</div>
        <div>
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
            <button className="text-red-600 hover:text-red-900 ml-4 text-sm font-medium">Delete</button>
        </div>
    </div>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
          </div>
          <button className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Add New Product
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Product Listings</h2>
        <div className="overflow-x-auto">
            <div className="min-w-full">
                {/* Header */}
                <div className="grid grid-cols-6 gap-4 p-3 bg-gray-50 rounded-t-lg font-semibold text-gray-600 text-sm">
                    <div className="col-span-2">Product</div>
                    <div>Price</div>
                    <div>Stock</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
                {/* Body */}
                <div>
                    {farmerProducts.map(product => <ProductRow key={product.id} product={product} />)}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;