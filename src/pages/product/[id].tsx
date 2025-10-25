import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '../../features/product/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addToCart } from '../../features/cart/cartSlice';
import Navbar from '../../components/Navbar';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col md:flex-row gap-4">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-cover"/>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-blue-600">Rp{product.price}</p>
          <p className="mt-2">{product.description}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
