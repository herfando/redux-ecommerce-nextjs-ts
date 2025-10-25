import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import { AppDispatch, RootState } from '../app/store';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? <p>Loading...</p> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
