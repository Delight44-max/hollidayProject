'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useCart } from '../context/CartContext';
import ProductImage from './ProductImage';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductDetailClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);


  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {

      const API_URL = `https://api.escuelajs.co/api/v1/products/${productId}`;

      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          notFound();
          return;
        }

        const productData: Product = await res.json();
        setProduct(productData);
      } catch (error) {

        console.error("Client-side fetch error:", error);

        notFound();
      } finally {
        setLoading(false);
      }
    }


    if (productId) {
        fetchProduct();
    } else {

        notFound();
    }
  }, [productId]);

  if (loading) {
    return <div className="p-8 text-center text-xl">Loading product details...</div>;
  }

  if (!product) {
      notFound();
      return null;
  }


  const handleAddToCart = () => {

      addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0] || '/images/placeholder-african.png',
      });
      alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-4xl font-extrabold mb-6">{product.title}</h1>
      <div className="md:flex md:space-x-8">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          {product.images.map((imgUrl, index) => (
            <ProductImage
              key={index}
              src={imgUrl}
              alt={`${product.title} image ${index + 1}`}
              className="w-full md:w-64 h-64 object-cover rounded-md mb-4 shadow-md"
            />
          ))}
        </div>
        <div className="flex-1">
          <p className="text-3xl font-bold text-green-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Description</h2>
          <p className="text-gray-700">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-black text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-150"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}