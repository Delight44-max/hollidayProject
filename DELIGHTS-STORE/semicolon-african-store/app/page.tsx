
import ProductList from '../components/ProductList';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default async function Home() {
  const API_URL = "https://api.escuelajs.co/api/v1/products?limit=10&offset=0";

  const response = await fetch(API_URL, {
    next: { revalidate: 60 * 60 * 24 },
  });

  const data = await response.json();


  const initialProducts: Product[] = Array.isArray(data) ? data : [];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Semicolon African Store - Products
      </h1>

      <ProductList initialProducts={initialProducts} />

    </main>
  );
}