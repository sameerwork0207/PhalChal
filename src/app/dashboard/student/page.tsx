import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({
      where: { studentId: session.user.id },
      include: {
        items: { include: { product: true } },
        village: true,
        deliveryBoy: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("No database connection available", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-wrap items-center justify-between mb-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-900">{order.id}</span></p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'PLACED' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                  <p className="mt-1 font-semibold text-gray-900">Total: ₹{order.total}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Items:</p>
                <ul className="space-y-2">
                  {order.items.map((item: any) => (
                    <li key={item.id} className="text-sm text-gray-600 flex justify-between">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                <p><strong>Delivery Slot:</strong> {order.slot}</p>
                <p><strong>Pickup Village:</strong> {order.village?.name || 'N/A'}</p>
                <p><strong>Delivery Partner:</strong> {order.deliveryBoy?.name || 'Assigned soon'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
