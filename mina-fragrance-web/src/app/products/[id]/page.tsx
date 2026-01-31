'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { productsApi, getImageUrl, getProductImages } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { ImageSlider } from '@/components/ui/ImageSlider';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${product.name} ajouté au panier`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-10 bg-gray-200 rounded w-1/3 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 mb-4">Produit non trouvé</p>
        <Link href="/products">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Button>
        </Link>
      </div>
    );
  }

  const productImages = getProductImages(product.images);
  const images = productImages.length > 0
    ? productImages.map(img => getImageUrl(img))
    : ['/placeholder.jpg'];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-rose-500">Accueil</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-rose-500">Boutique</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-rose-500"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Slider */}
          <ImageSlider
            images={images}
            productName={product.name}
            badge={product.featured ? 'Produit vedette' : undefined}
          />

          {/* Product Info */}
          <div>
            {product.category && (
              <Link
                href={`/categories/${product.category.slug}`}
                className="text-rose-500 font-medium text-sm hover:text-rose-600"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              {product.price.toLocaleString('fr-FR')} FCFA
            </p>

            <div className="prose prose-gray mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center mb-6">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-600">
                    En stock ({product.stock} disponibles)
                  </span>
                </>
              ) : (
                <span className="text-red-500">Rupture de stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Quantité:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <Button onClick={handleAddToCart} size="lg" className="w-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
