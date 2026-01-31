'use client';

import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="card overflow-hidden animate-pulse"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded-full w-1/4" />
        <div className="h-5 bg-gray-200 rounded-full w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-2/3" />
        </div>
        <div className="flex justify-between items-center pt-3">
          <div className="h-7 bg-gray-200 rounded-full w-1/3" />
          <div className="h-12 w-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const productList = Array.isArray(products) ? products : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Nous n'avons pas trouvé de produits correspondant à votre recherche.
          Essayez de modifier vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {productList.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
