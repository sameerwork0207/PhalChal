import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Using robust image links and expanding product categories to include Dairy
  const products = [
    { id: '1', name: 'Farm Fresh Sugarcane', category: 'Vegetables', price: 40, unit: 'bundle', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.8, image: 'https://images.unsplash.com/photo-1520696342898-316881c002bd?auto=format&fit=crop&w=600&q=80' },
    { id: '2', name: 'Sweet Pomegranate', category: 'Fruits', price: 120, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Pohegoan', rating: 4.9, image: 'https://images.unsplash.com/photo-1565158145826-b8c115fd2441?auto=format&fit=crop&w=600&q=80' },
    { id: '3', name: 'Buffalo Milk (Fresh)', category: 'Dairy', price: 65, unit: 'liter', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 4.9, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' },
    { id: '4', name: 'Fresh Paneer', category: 'Dairy', price: 320, unit: 'kg', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 4.8, image: 'https://images.unsplash.com/photo-1631515243349-e0cb75bfceb1?auto=format&fit=crop&w=600&q=80' },
    { id: '5', name: 'Green Chilli', category: 'Vegetables', price: 60, unit: 'kg', farmer: { name: 'Ramesh Patil' }, village: 'Yesgoan', rating: 4.5, image: 'https://images.unsplash.com/photo-1588726880053-d14c360be8b8?auto=format&fit=crop&w=600&q=80' },
    { id: '6', name: 'Red Onion', category: 'Vegetables', price: 30, unit: 'kg', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.6, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80' },
    { id: '7', name: 'Organic Papaya', category: 'Fruits', price: 50, unit: 'piece', farmer: { name: 'Vishal Gavhane' }, village: 'Sonewadi', rating: 4.8, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
    { id: '8', name: 'Sweet Bananas', category: 'Fruits', price: 40, unit: 'dozen', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.7, image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80' },
    { id: '9', name: 'Desi Ghee (Cow)', category: 'Dairy', price: 600, unit: 'liter', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 5.0, image: 'https://images.unsplash.com/photo-1647427017056-11f4d0bead2c?auto=format&fit=crop&w=600&q=80' },
    { id: '10', name: 'Farm Tomatoes', category: 'Vegetables', price: 35, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Pohegoan', rating: 4.5, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { id: '11', name: 'Fresh Cabbage', category: 'Vegetables', price: 40, unit: 'kg', farmer: { name: 'Sambhaji Kale' }, village: 'Karanji Bk', rating: 4.4, image: 'https://images.unsplash.com/photo-1592424040608-f4b6dc5eb7db?auto=format&fit=crop&w=600&q=80' },
    { id: '12', name: 'Golden Mangoes', category: 'Fruits', price: 150, unit: 'kg', farmer: { name: 'Ramesh Patil' }, village: 'Yesgoan', rating: 4.9, image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Available Products from Nearby Villages</h2>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              unit={product.unit}
              farmerName={product.farmer?.name}
              village={product.village}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
