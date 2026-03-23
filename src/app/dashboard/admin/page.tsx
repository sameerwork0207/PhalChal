"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "ADMIN")) {
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

  if (loading) return <div className="p-8 text-center bg-gray-50 min-h-screen">Loading...</div>;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalCommission = orders.reduce((sum, order) => sum + (order.commission || 0), 0);
  const totalDeliveryFees = orders.reduce((sum, order) => sum + (order.deliveryFee || 0), 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard - KhetConnect</h1>
        
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{orders.length}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Gross Sales Volume</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">₹{totalRevenue.toFixed(2)}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Platform Commission</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">₹{totalCommission.toFixed(2)}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Delivery Fees</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">₹{totalDeliveryFees.toFixed(2)}</dd>
          </div>
        </div>

        {/* Global Orders List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-12">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Global Orders</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {orders.slice(0, 10).map((order) => (
              <li key={order.id} className="px-4 py-4 sm:px-6 flex justify-between items-center bg-white hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-green-600 truncate">Order #{order.id.slice(-6)} - {order.student?.name}</p>
                  <p className="mt-1 flex items-center text-sm text-gray-500">
                    <span className="truncate">Village: {order.village?.name} | Slot: {order.slot}</span>
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex text-right gap-4 items-center">
                  <p className="text-sm text-gray-900 font-bold">₹{order.total}</p>
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
