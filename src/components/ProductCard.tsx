"use client";

import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  farmerName?: string;
};

export default function ProductCard({ id, name, category, price, unit, farmerName }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, name, price, quantity: 1, unit });
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 lg:aspect-none lg:h-48 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
           <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {name}
          </h3>
          <p className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">{category}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{farmerName ? `Farmer: ${farmerName}` : 'Local Farmer'}</p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">₹{price}<span className="text-sm text-gray-500 font-normal"> / {unit}</span></p>
          <button 
            onClick={handleAdd}
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
