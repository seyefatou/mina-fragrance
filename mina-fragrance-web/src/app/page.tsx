'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Sparkles, Droplet, Star, Crown, Gift, Flower2, SprayCan, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { productsApi, categoriesApi } from '@/lib/api';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';

import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  {
    slug: 'parfums-brumes',
    name: 'Parfums & Brumes',
    description: 'Fragrances envoûtantes',
    icon: Sparkles,
    gradient: 'from-rose-400 to-rose-600',
    bgGlow: 'bg-rose-500/20',
  },
  {
    slug: 'soins-corps',
    name: 'Soins du Corps',
    description: 'Lait, huile, gel douche & crème',
    icon: Droplet,
    gradient: 'from-amber-400 to-amber-600',
    bgGlow: 'bg-amber-500/20',
  },
  {
    slug: 'deodorants',
    name: 'Déodorants',
    description: 'Crème, spray & stick',
    icon: SprayCan,
    gradient: 'from-teal-400 to-teal-600',
    bgGlow: 'bg-teal-500/20',
  },
];

const features = [
  { icon: Crown, title: 'Qualité Premium', description: 'Produits soigneusement sélectionnés' },
  { icon: Gift, title: 'Livraison Soignée', description: 'Emballage cadeau offert' },
  { icon: Star, title: 'Satisfaction', description: 'Garantie satisfait ou remboursé' },
];

const productTypes = [
  {
    name: 'Parfums',
    category: 'parfums-brumes',
    description: 'Fragrances luxueuses',
    gradient: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
  {
    name: 'Brumes',
    category: 'parfums-brumes',
    description: 'Légèreté parfumée',
    gradient: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Lait de Corps',
    category: 'soins-corps',
    description: 'Hydratation intense',
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
  {
    name: 'Huile Vergeture',
    category: 'soins-corps',
    description: 'Soin réparateur',
    gradient: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
  },
  {
    name: 'Gel de Douche',
    category: 'soins-corps',
    description: 'Fraîcheur quotidienne',
    gradient: 'from-blue-500 to-sky-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Crème Main',
    category: 'soins-corps',
    description: 'Douceur protectrice',
    gradient: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
  },
  {
    name: 'Déocrème',
    category: 'deodorants',
    description: 'Protection naturelle',
    gradient: 'from-fuchsia-500 to-pink-600',
    bgColor: 'bg-fuchsia-50',
  },
  {
    name: 'Déo Spray',
    category: 'deodorants',
    description: 'Fraîcheur longue durée',
    gradient: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Déo Stick',
    category: 'deodorants',
    description: 'Application précise',
    gradient: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
  },
];

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.getFeatured,
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Blobs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-rose-300/20 rounded-full blur-2xl animate-float-delayed" />

          {/* Sparkle decorations */}
          <div className="absolute top-1/4 right-1/3 text-white/30 animate-sparkle">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-gold/40 animate-sparkle" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute top-1/3 left-1/4 text-white/20 animate-sparkle" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-10 h-10" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium">Collection Exclusive</span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Votre monde,{' '}
                <span className="relative">
                  <span className="text-gold drop-shadow-lg">parfumé</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                {' '}à la perfection
              </h1>

              <p className="text-lg md:text-xl text-rose-100 mb-8 max-w-lg leading-relaxed">
                Découvrez notre collection exclusive de parfums, brumes, soins du corps
                et déodorants. Qualité premium pour sublimer votre beauté au quotidien.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button variant="gold" size="lg" className="group">
                    Découvrir la boutique
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/categories/parfums-brumes">
                  <Button variant="secondary" size="lg" className="bg-white/10 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm">
                    Nos parfums
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">100+</p>
                  <p className="text-sm text-rose-200">Clients satisfaits</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">4.9</p>
                  <p className="text-sm text-rose-200">Note moyenne</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">100%</p>
                  <p className="text-sm text-rose-200">Authentique</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="hidden md:block relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full aspect-square">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[90%] h-[90%] rounded-full border-2 border-white/20 animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[70%] h-[70%] rounded-full border border-gold/30" />
                </div>

                {/* Main circle with gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm flex items-center justify-center">
                    <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-rose-300/30 to-gold/20 flex items-center justify-center shadow-2xl">
                      <Sparkles className="w-24 h-24 text-white/80" />
                    </div>
                  </div>
                </div>

                {/* Floating product badges */}
                <div className="absolute top-10 right-0 glass rounded-2xl p-4 animate-float shadow-xl">
                  <p className="text-rose-600 font-semibold">Parfums</p>
                  <p className="text-sm text-gray-500">Premium</p>
                </div>
                <div className="absolute bottom-20 left-0 glass rounded-2xl p-4 animate-float-delayed shadow-xl">
                  <p className="text-amber-600 font-semibold">Huiles</p>
                  <p className="text-sm text-gray-500">Naturelles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92C840 95 960 100 1080 102C1200 105 1320 105 1380 105L1440 105V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDF2F8"/>
          </svg>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-rose-50 py-8 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 justify-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{feature.title}</p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block text-rose-500 font-medium mb-4 tracking-wider uppercase text-sm">
              Nos Collections
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explorez nos <span className="gradient-text">Catégories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Une sélection soigneusement choisie pour sublimer votre quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="group relative card card-hover p-8 text-center overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 ${category.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                  <div className="relative">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 mb-4">{category.description}</p>
                    <span className="inline-flex items-center text-rose-500 font-medium group-hover:gap-2 transition-all">
                      Découvrir
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Types Section - Carousel */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-block text-rose-500 font-medium mb-4 tracking-wider uppercase text-sm">
              Ce que nous offrons
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos <span className="gradient-text">Produits</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une gamme complète pour prendre soin de vous au quotidien
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative group/carousel">
            {/* Navigation Buttons */}
            <button className="products-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:-translate-x-2 disabled:opacity-30">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="products-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 hover:shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-2 disabled:opacity-30">
              <ChevronRight className="w-6 h-6" />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1.2}
              centeredSlides={false}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: '.products-prev',
                nextEl: '.products-next',
              }}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 2.5, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 4.5, spaceBetween: 24 },
              }}
              className="!overflow-visible py-4"
            >
              {productTypes.map((product) => (
                <SwiperSlide key={product.name}>
                  <Link href={`/categories/${product.category}`}>
                    <div className={`group relative ${product.bgColor} rounded-2xl p-6 h-48 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2`}>
                      {/* Background Gradient on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Decorative Circle */}
                      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br ${product.gradient} opacity-20 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500`} />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center text-rose-500 group-hover:text-white font-medium text-sm transition-colors duration-300">
                          <span>Découvrir</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-rose-50/50 relative">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="animate-fade-in-up">
              <span className="inline-block text-rose-500 font-medium mb-4 tracking-wider uppercase text-sm">
                Sélection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                Produits <span className="gradient-text">Vedettes</span>
              </h2>
              <p className="text-gray-600 text-lg">Notre sélection coup de coeur</p>
            </div>
            <Link href="/products" className="mt-6 md:mt-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="secondary" className="group">
                Voir tout
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts || []} isLoading={isLoading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Gift className="w-4 h-4 text-gold" />
              <span className="text-sm text-rose-200">Offre Spéciale</span>
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              Rejoignez l'univers{' '}
              <span className="relative inline-block">
                <span className="text-gold">Minaa</span>
                <Sparkles className="absolute -top-4 -right-6 w-6 h-6 text-gold animate-sparkle" />
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Inscrivez-vous à notre newsletter et recevez{' '}
              <span className="text-gold font-semibold">10% de réduction</span>{' '}
              sur votre première commande
            </p>

            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all hover:bg-white/10"
              />
              <Button variant="gold" size="lg" className="whitespace-nowrap">
                S'inscrire
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              En vous inscrivant, vous acceptez nos conditions générales
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
