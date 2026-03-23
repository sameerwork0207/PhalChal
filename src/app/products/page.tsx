import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Using locally sourced, high quality dummy data based on user context
  const products = [
    { id: '1', name: 'Fresh Sugarcane', category: 'Vegetables', price: 40, unit: 'bundle', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.8, image: 'https://images.unsplash.com/photo-1590005024443-162e249f7e7f?auto=format&fit=crop&w=600&q=80' },
    { id: '2', name: 'Sweet Pomegranate', category: 'Fruits', price: 120, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Pohegoan', rating: 4.9, image: 'https://images.unsplash.com/photo-1615486171448-6fc9cb0910f0?auto=format&fit=crop&w=600&q=80' },
    { id: '3', name: 'Farm Grapes', category: 'Fruits', price: 80, unit: 'kg', farmer: { name: 'Vishal Gavhane' }, village: 'Sonewadi', rating: 4.7, image: 'https://images.unsplash.com/photo-1596365549141-8f3522ba5a27?auto=format&fit=crop&w=600&q=80' },
    { id: '4', name: 'Green Chilli', category: 'Vegetables', price: 60, unit: 'kg', farmer: { name: 'Ramesh Patil' }, village: 'Yesgoan', rating: 4.5, image: 'https://images.unsplash.com/photo-1588726880053-d14c360be8b8?auto=format&fit=crop&w=600&q=80' },
    { id: '5', name: 'Fresh Onion', category: 'Vegetables', price: 30, unit: 'kg', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.6, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80' },
    { id: '6', name: 'Organic Papaya', category: 'Fruits', price: 50, unit: 'piece', farmer: { name: 'Vishal Gavhane' }, village: 'Dhamori', rating: 4.8, image: 'https://images.unsplash.com/photo-1517282009859-f000ef1b4f40?auto=format&fit=crop&w=600&q=80' },
    { id: '7', name: 'Sweet Chikoo', category: 'Fruits', price: 60, unit: 'kg', farmer: { name: 'Sambhaji Kale' }, village: 'Karanji Bk', rating: 4.7, image: 'https://images.unsplash.com/photo-1616868516035-c81ee020c66d?auto=format&fit=crop&w=600&q=80' },
    { id: '8', name: 'Fresh Cabbage', category: 'Vegetables', price: 40, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Yesgoan', rating: 4.4, image: 'https://images.unsplash.com/photo-1592424040608-f4b6dc5eb7db?auto=format&fit=crop&w=600&q=80' },
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
