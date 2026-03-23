import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: any[] = [];
  let error = false;

  try {
    products = await prisma.product.findMany({
      include: {
        farmer: true
      }
    });

    if (products.length === 0) {
      // Provide dummy data if DB is empty but connected
      products = [
        { id: '1', name: 'Fresh Tomato', category: 'Vegetables', price: 30, unit: 'kg', farmer: { name: 'Kisan Ramesh' } },
        { id: '2', name: 'Desi Potato', category: 'Vegetables', price: 25, unit: 'kg', farmer: { name: 'Local Farmer' } },
        { id: '3', name: 'Buffalo Milk', category: 'Dairy', price: 65, unit: 'liter', farmer: { name: 'Dairy Farm' } },
        { id: '4', name: 'Sweet Banana', category: 'Fruits', price: 50, unit: 'dozen', farmer: { name: 'Fruit Seller' } },
      ];
    }
  } catch (e) {
    console.error("Database connection failed. Serving dummy items.", e);
    error = true;
    products = [
      { id: '1', name: 'Fresh Tomato', category: 'Vegetables', price: 30, unit: 'kg', farmer: { name: 'Kisan Ramesh' } },
      { id: '2', name: 'Desi Potato', category: 'Vegetables', price: 25, unit: 'kg', farmer: { name: 'Local Farmer' } },
      { id: '3', name: 'Buffalo Milk', category: 'Dairy', price: 65, unit: 'liter', farmer: { name: 'Dairy Farm' } },
      { id: '4', name: 'Sweet Banana', category: 'Fruits', price: 50, unit: 'dozen', farmer: { name: 'Fruit Seller' } },
    ];
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Available Products</h2>
        
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 text-yellow-800 rounded-md">
            Warning: Connected to fallback dummy data. Ensure DATABASE_URL is set in .env to use live data.
          </div>
        )}

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
