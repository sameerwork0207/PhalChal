"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FarmerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "FARMER")) {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome, {session?.user.name}. Here are the orders containing your products.</p>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order #{order.id.slice(-6)}</h3>
                  <p className="text-sm text-gray-500">Slot: {order.slot}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'PLACED' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                </span>
              </div>
              
              <ul className="mb-6 space-y-2">
                {order.items.filter((i:any) => i.product.farmerId === session?.user.id).map((item: any) => (
                  <li key={item.id} className="text-sm text-gray-700 flex justify-between">
                    <span>{item.quantity}x {item.product.name}</span>
                  </li>
                ))}
              </ul>

              {order.status === "PLACED" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "ACCEPTED")}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
                >
                  Accept & Prepare
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
