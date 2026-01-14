'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import CategoryFilter from './CategoryFilter';
import ProductImage from './ProductImage';


const PRODUCT_LIMIT = 10;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');


  const [offset, setOffset] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(initialProducts.length === PRODUCT_LIMIT);



  const handleSelectCategory = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setOffset(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setOffset(0);
  };



  const fetchProducts = async (
    currentOffset: number,
    isAppend: boolean = false
  ) => {
    setLoading(true);

    let API_URL = `https://api.escuelajs.co/api/v1/products?limit=${PRODUCT_LIMIT}&offset=${currentOffset}`;


    if (activeCategory !== null) {
      API_URL += `&categoryId=${activeCategory}`;
    }


    if (searchTerm.trim() !== '') {
      API_URL += `&title=${encodeURIComponent(searchTerm.trim())}`;
    }

    try {
      const res = await fetch(API_URL);
      const data: Product[] = await res.json();

      if (isAppend) {

        setProducts(prevProducts => [...prevProducts, ...data]);
      } else {

        setProducts(data);
      }


      setCanLoadMore(data.length === PRODUCT_LIMIT);

    } catch (error) {
      console.error("Failed to fetch products:", error);

      if (!isAppend) setProducts([]);
      setCanLoadMore(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    if (offset === 0) {
        const debounceTimeout = setTimeout(() => {
            fetchProducts(0, false); // Fetch from offset 0, and REPLACE the list
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }
  }, [activeCategory, searchTerm, offset]);



  const handleLoadMore = () => {
    const newOffset = offset + PRODUCT_LIMIT;
    setOffset(newOffset);

    fetchProducts(newOffset, true);
  };



  return (
    <>
      {/* ... (Search and Category Filter UI remains the same) ... */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* Category Filter Component */}
        <div className="w-full md:w-2/3">
           <CategoryFilter onSelectCategory={handleSelectCategory} />
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 && !loading ? (
        <div className="text-center py-10 text-xl text-gray-500">
          No products found matching your search or category selection.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block"
            >
              <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer h-full">
                {product.images?.[0] ? (
                  <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4 text-gray-500">
                    No Image Provided
                  </div>
                )}
                <h2 className="text-xl font-semibold line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Loading indicator (show while fetching the next batch) */}
      {loading && (
        <div className="text-center py-10 text-xl font-medium">Loading products...</div>
      )}

      {/* --- NEW UI: Load More Button --- */}
      {!loading && products.length > 0 && canLoadMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg hover:bg-black transition duration-150 shadow-md"
          >
            Load More Products
          </button>
        </div>
      )}
    </>
  );
}