import { CartItem as CartType } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { removeFromCart } from '../features/cart/cartSlice';

interface Props { item: CartType }

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-between border p-2 rounded mb-2">
      <div>{item.title} x {item.quantity}</div>
      <div>Rp{item.price * item.quantity}</div>
      <button
        className="text-red-500"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        Remove
      </button>
    </div>
  );
}
