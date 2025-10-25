'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">E-Shop</Link>
      <div className="flex items-center gap-4">
        {user.loggedIn ? (
          <>
            <span>Hi, {user.currentUser?.username}</span>
            <Link href="/checkout">Checkout</Link>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <Link href="/cart">Cart ({cartItems.length})</Link>
      </div>
    </nav>
  );
}
