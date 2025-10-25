'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, Product } from '../features/product/productSlice';
import { RootState, AppDispatch } from './store';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => dispatch(setProducts(data.products)));
  }, [dispatch]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
