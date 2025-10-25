'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Product } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded flex flex-col">
      <img src={product.img} alt={product.title} className="mb-2 w-full h-40 object-cover"/>
      <h2 className="font-bold">{product.title}</h2>
      <p className="text-green-600 font-semibold">Rp{product.price}</p>
      <div className="mt-auto flex justify-between">
        <Link href={`/product/${product.id}`} className="text-blue-600">Details</Link>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-2 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
