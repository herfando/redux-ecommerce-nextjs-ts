import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Auth guard
  if (!user.loggedIn) {
    router.push('/login');
    return null;
  }

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed!\nTotal: Rp${total}\nAddress: ${address}, ${city}, ${postalCode}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="mb-4">
          <h2 className="font-bold mb-2">Cart Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between mb-1">
              <span>{item.title} x {item.quantity}</span>
              <span>Rp{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="font-bold mt-2">Total: Rp{total}</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
