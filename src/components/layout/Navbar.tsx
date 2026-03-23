"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 text-3xl font-bold text-green-600">
              <img src="/logo.png" alt="फलचल Logo" className="h-[4rem] w-auto object-contain mix-blend-multiply" />
            </Link>
          </div>
          
          <nav className="flex space-x-8 items-center">
            <Link href="/products" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            
            <Link href="/cart" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {session ? (
              <>
                <Link href={`/dashboard/${session.user.role.toLowerCase()}`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium">
                Login / Signup
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
