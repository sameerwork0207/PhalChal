"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { items, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const [slot, setSlot] = useState("MORNING");
  const [villageId, setVillageId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Commision: 8%
  const commission = totalPrice * 0.08;
  
  const totalKg = items.reduce((sum, item) => sum + item.quantity, 0);
  let deliveryFee = 20;
  if (totalKg > 2) {
    deliveryFee = 20 + Math.ceil(totalKg - 2) * 5;
  }
  const finalTotal = totalPrice + commission + deliveryFee;

  const handleCheckout = async () => {
    if (!session) {
      alert("Please login to checkout");
      router.push("/login");
      return;
    }

    if (!villageId) {
      alert("Please select a village delivery point.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          slot,
          villageId,
          total: finalTotal,
          commission,
          deliveryFee
        })
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      const order = await response.json();
      clearCart();
      router.push(`/dashboard/student?success=1`);
    } catch (e: any) {
      alert(e.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-lg w-full">
          <svg className="mx-auto h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="mt-4 text-gray-500">Go to Products to add items to your cart. Delivery is just ₹20 for the first 2kg!</p>
          <button onClick={() => router.push('/products')} className="mt-8 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Browse Products</button>
        </div>
      </div>
    );
  }

  // Delivery locations for the UI
  const dummyVillages = [
    { id: "v1", name: "Hostel College Campus" },
    { id: "v2", name: "G1" },
    { id: "v3", name: "G2" },
    { id: "v4", name: "B1" },
    { id: "v5", name: "B2 Hostel" },
    { id: "v6", name: "Annapurna Nagar" },
    { id: "v7", name: "Major Hostel" },
    { id: "v8", name: "Biroba Mandir" },
    { id: "v9", name: "Godawari Complex" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200 bg-white shadow-sm rounded-lg">
              {items.map((item) => (
                <li key={item.id} className="flex py-6 px-4 sm:px-6">
                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price} / {item.unit}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                        <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md">Qty: {item.quantity}</span>
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <dl className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm">
                  <span>Platform Commission (8%)</span>
                </dt>
                <dd className="font-medium text-gray-900">₹{commission.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm">
                  <span>Delivery Fee</span>
                </dt>
                <dd className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">₹{finalTotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-gray-200 pt-6">
               <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                 Select Village / Campus Point
               </label>
               <select
                 value={villageId}
                 onChange={(e) => setVillageId(e.target.value)}
                 className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3 bg-white"
               >
                 <option value="" disabled>-- Select Campus Village --</option>
                 {dummyVillages.map(v => (
                   <option key={v.id} value={v.id}>{v.name}</option>
                 ))}
               </select>

               <label className="block mt-6 text-sm font-medium leading-6 text-gray-900 mb-2">
                 Select Delivery Slot
               </label>
               <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="MORNING" checked={slot === "MORNING"} onChange={(e) => setSlot(e.target.value)} name="slot" className="h-4 w-4 text-green-600 focus:ring-green-600" />
                    <span>Morning 8 AM</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="EVENING" checked={slot === "EVENING"} onChange={(e) => setSlot(e.target.value)} name="slot" className="h-4 w-4 text-green-600 focus:ring-green-600" />
                    <span>Evening 6 PM</span>
                  </label>
               </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex justify-center disabled:opacity-50"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm & Pay (Test)"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
