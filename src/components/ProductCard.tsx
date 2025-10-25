import { Product } from '../features/product/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addToCart } from '../features/cart/cartSlice';
import Link from 'next/link';

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
      </Link>
      <h3 className="font-bold mt-2">{product.title}</h3>
      <p className="text-blue-600">Rp{product.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}
