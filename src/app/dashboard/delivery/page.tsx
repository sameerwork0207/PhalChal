"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeliveryDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "DELIVERY")) {
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

  if (loading) return <div className="p-8 text-center bg-gray-50 min-h-screen">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Partner Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {session?.user.name}. Manage deliveries for your assigned village.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Earnings Card Dummy */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Today's Earnings</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">₹{orders.filter(o => o.status === 'DELIVERED').length * 20}</p>
            <p className="text-xs text-gray-500 mt-1">₹20 per completed delivery</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Pending Deliveries</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
            No orders for your village currently.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.filter(o => o.status !== 'DELIVERED').map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">Order #{order.id.slice(-6)}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">{order.slot}</span>
                  </div>
                  <p className="text-sm text-gray-600"><strong>Customer:</strong> {order.student?.name} ({order.student?.phone})</p>
                  <p className="text-sm text-gray-600"><strong>Village Point:</strong> {order.village?.name}</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  {order.status === "ACCEPTED" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "PICKED_UP")}
                      className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Mark Picked Up
                    </button>
                  )}
                  {order.status === "PICKED_UP" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                      className="flex-1 md:flex-none bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {order.status !== "ACCEPTED" && order.status !== "PICKED_UP" && (
                    <span className="text-sm text-gray-500 italic">Waiting for farmer to accept...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
