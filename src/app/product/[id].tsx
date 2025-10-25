'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../../components/Navbar';
import { Product } from '../../features/product/productSlice';

export default function ProductPage() {
  const { id } = useParams();
  const products = useSelector((state: RootState) => state.product.products);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = products.find(p => p.id === Number(id));
    if (p) setProduct(p);
  }, [id, products]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col md:flex-row gap-4">
        {/* Perbaikan: gunakan 'img' bukan 'image' */}
        <img
          src={product.img}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-blue-600">Rp{product.price}</p>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>
    </>
  );
}
