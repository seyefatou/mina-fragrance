'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { categoriesApi } from '@/lib/api';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: category, isLoading, error } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-1/4 mb-4" />
              <div className="h-4 bg-white/20 rounded w-1/2" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductGrid products={[]} isLoading={true} />
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 mb-4">Catégorie non trouvée</p>
        <Link href="/products">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-rose-100 mb-4">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white">Boutique</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            {category.name}
          </h1>
          <p className="text-rose-100">
            {category._count?.products || 0} produit(s) dans cette catégorie
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {category.products && category.products.length > 0 ? (
          <ProductGrid products={category.products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Aucun produit dans cette catégorie pour le moment
            </p>
            <Link href="/products">
              <Button variant="secondary">
                Voir tous les produits
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
