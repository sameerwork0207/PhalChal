import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Using robust image links and expanding product categories to include Dairy
  const products = [
    { id: '1', name: 'Farm Fresh Sugarcane', category: 'Vegetables', price: 40, unit: 'bundle', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.8, image: 'https://imgs.search.brave.com/Gkt1Dt4966luO39p04IbPQd6bmVBt_YQKqg5A7_S8AY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdGFsa3Mtc3Vn/YXJjYW5lLXByZXBh/cmVkLXByb2R1Y2lu/Zy1qdWljZV8zODQz/Mi0yMi5qcGc_c2Vt/dD1haXNfaHlicmlk' },
    { id: '2', name: 'Sweet Pomegranate', category: 'Fruits', price: 120, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Pohegoan', rating: 4.9, image: 'https://imgs.search.brave.com/dOSmQ8kGzle9HQtG52S_31QBHS0tmPN8VO2o3FQYd-4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/MjAxLzI3NC9zbWFs/bC9qdWljeS1yZWQt/cG9tZWdyYW5hdGUt/d2l0aC1zZWVkcy1h/bmQtbGVhdmVzLWZy/ZWUtcG5nLnBuZw' },
    { id: '3', name: 'Buffalo Milk (Fresh)', category: 'Dairy', price: 65, unit: 'liter', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 4.9, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/600px-Milk_glass.jpg' },
    { id: '4', name: 'Fresh Paneer', category: 'Dairy', price: 320, unit: 'kg', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 4.8, image: 'https://imgs.search.brave.com/hgIhLSLNigUJzmUC8uJtj09NlnDYCclbmpcueX5QnEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MjUzMTM2Ni9waG90/by93aGl0ZS1mcmVz/aC1wYW5lZXItZ2Fy/bmlzaGVkLXdpdGgt/Z3JlZW4tbGVhZi1v/bi1hLXdoaXRlLWNs/b3RoLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ZTGJnb05Y/VzliaVdhMFNwSk03/OXR3Vmpka1gwYXBR/aXNzR0M0Tkx0N0FJ/PQ' },
    { id: '5', name: 'Green Chilli', category: 'Vegetables', price: 60, unit: 'kg', farmer: { name: 'Ramesh Patil' }, village: 'Yesgoan', rating: 4.5, image: 'https://imgs.search.brave.com/TamJzyi5ocIUoCbLAAD6Qvzy61pd_fBnt9C_3SSyYoI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY4/NTc2NTM3NC9waG90/by9ncmVlbi1jaGls/aS1wZXBwZXJzLWF0/LW1hcmtldC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZU5H/YjZHeFVuOEFqdG9S/NDhVVGtoT2xYUlBn/eHVXWWFrMllaWF9G/UG5zQT0' },
    { id: '6', name: 'Red Onion', category: 'Vegetables', price: 30, unit: 'kg', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.6, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=600&q=80' },
    { id: '7', name: 'Organic Papaya', category: 'Fruits', price: 50, unit: 'piece', farmer: { name: 'Vishal Gavhane' }, village: 'Sonewadi', rating: 4.8, image: 'https://imgs.search.brave.com/Uj_Jv3xI1wzDTfZr9KtW1CB3OoVGlm0H256tp4nu3j0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzQwLzY0LzA3/LzM2MF9GXzQ0MDY0/MDc2N184bUt0T2FM/OVl6Q29POHRkdDZV/R3JDSFg2V2tkbExw/ZC5qcGc' },
    { id: '8', name: 'Sweet Bananas', category: 'Fruits', price: 40, unit: 'dozen', farmer: { name: 'Vishwas Deshmukh' }, village: 'Dhamori', rating: 4.7, image: 'https://imgs.search.brave.com/S0TFDMrGHs78o2Gy7XNfjYRDBG9LuAGwCW5KsHylxQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI3/MjA1ODU4Ny9waG90/by9zbWFsbC1iYW5h/bmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUdZTHFZYWg5/ZmwwYUxod3RrNHZJ/MWZfM2FGOXBVVE13/bFJnajh4WjBNdUk9' },
    { id: '9', name: 'Desi Ghee (Cow)', category: 'Dairy', price: 600, unit: 'liter', farmer: { name: 'Godawari Dairy' }, village: 'Kolpewadi', rating: 5.0, image: 'https://imgs.search.brave.com/yJIrQHqzOtqvLTla_nb0gd7_BpKEkRqhxL0uTm79SAw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9TRUxMRVIvRGVm/YXVsdC8yMDIyLzQv/SFgvTE4vTlAvODkw/MTEzMi9nb2RhdmFy/aS1naGVlLTEwMDB4/MTAwMC5wbmc' },
    { id: '10', name: 'Farm Tomatoes', category: 'Vegetables', price: 35, unit: 'kg', farmer: { name: 'Shantaram Patil' }, village: 'Pohegoan', rating: 4.5, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { id: '11', name: 'Fresh Cabbage', category: 'Vegetables', price: 40, unit: 'kg', farmer: { name: 'Sambhaji Kale' }, village: 'Karanji Bk', rating: 4.4, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/600px-Cabbage_and_cross_section_on_white.jpg' },
    { id: '12', name: 'Golden Mangoes', category: 'Fruits', price: 150, unit: 'kg', farmer: { name: 'Ramesh Patil' }, village: 'Yesgoan', rating: 4.9, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/600px-Mango_and_cross_section_edit.jpg' },
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
