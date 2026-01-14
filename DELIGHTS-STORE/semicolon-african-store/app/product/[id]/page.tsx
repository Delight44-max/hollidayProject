import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductDetailPage({
  params,
}: {

  params: Promise<Awaited<{ id: string }>>;
}) {

  const awaitedParams = await params;

  return <ProductDetailClient productId={awaitedParams.id} />;
}