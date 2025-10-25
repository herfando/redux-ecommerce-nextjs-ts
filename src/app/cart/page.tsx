'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import CartItem from '../../components/CartItem';
import { clearCart } from '../../features/cart/cartSlice';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold text-xl">Total: Rp{total}</p>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
