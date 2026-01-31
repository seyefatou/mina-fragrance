'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { getImageUrl, getProductImages } from '@/lib/api';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} ajouté au panier`);
  };

  const images = getProductImages(product.images);
  const imageUrl = images[0] ? getImageUrl(images[0]) : '/placeholder.svg';

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative card card-hover overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-gold to-gold-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-glow-gold">
                <Sparkles className="w-3 h-3" />
                Vedette
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-rose-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                Plus que {product.stock}
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Rupture de stock
              </span>
            </div>
          )}

          {/* Quick Actions - appear on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={(e) => e.preventDefault()}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:bg-rose-50 hover:scale-110"
              style={{ transitionDelay: '0ms' }}
            >
              <Heart className="w-4 h-4 text-gray-600 hover:text-rose-500" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:bg-rose-50 hover:scale-110"
              style={{ transitionDelay: '50ms' }}
            >
              <Eye className="w-4 h-4 text-gray-600 hover:text-rose-500" />
            </button>
          </div>

          {/* Add to cart button - slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-3 bg-white/95 backdrop-blur-sm text-gray-800 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">
            {product.category?.name}
          </p>

          {/* Name */}
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price and quick add */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {product.price.toLocaleString('fr-FR')}
              </span>
              <span className="text-sm text-gray-400 ml-1">FCFA</span>
            </div>

            {/* Mobile add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="md:hidden p-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}
