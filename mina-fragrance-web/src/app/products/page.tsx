'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, X } from 'lucide-react';
import { productsApi, categoriesApi } from '@/lib/api';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', { page, search, categoryId: selectedCategory }],
    queryFn: () =>
      productsApi.getAll({
        page,
        limit: 12,
        search: search || undefined,
        categoryId: selectedCategory || undefined,
      }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Notre Boutique
          </h1>
          <p className="text-rose-100">
            Découvrez tous nos produits
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-800">Filtres</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-rose-500 hover:text-rose-600"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Catégories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === ''
                        ? 'bg-rose-100 text-rose-600'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    Toutes les catégories
                  </button>
                  {categoriesData?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-rose-100 text-rose-600'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {category.name}
                      {category._count && (
                        <span className="text-gray-400 ml-2">
                          ({category._count.products})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-grow">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
              </Button>
            </div>

            {/* Active Filters */}
            {(search || selectedCategory) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {search && (
                  <span className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">
                    Recherche: {search}
                    <button
                      onClick={() => setSearch('')}
                      className="ml-2 hover:text-rose-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategory && categoriesData && (
                  <span className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">
                    {categoriesData.find((c) => c.id === selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 hover:text-rose-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results Count */}
            {data?.pagination && (
              <p className="text-gray-500 mb-6">
                {data.pagination.total} produit(s) trouvé(s)
              </p>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={data?.products || []}
              isLoading={isLoading}
            />

            {/* Pagination */}
            {data?.pagination && data.pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Précédent
                </Button>
                <span className="flex items-center px-4 text-gray-600">
                  Page {page} sur {data.pagination.totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= data.pagination.totalPages}
                >
                  Suivant
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
