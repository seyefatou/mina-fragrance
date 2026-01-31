'use client';

import { useQuery } from '@tanstack/react-query';
import { Package, FolderTree, ShoppingCart, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { productsApi, categoriesApi, ordersApi } from '@/lib/api';

export default function AdminDashboard() {
  const { data: productsData } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => productsApi.getAll({ limit: 1000 }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const { data: orderStats } = useQuery({
    queryKey: ['orders', 'stats'],
    queryFn: ordersApi.getStats,
  });

  const stats = [
    {
      label: 'Produits',
      value: productsData?.pagination?.total || 0,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Catégories',
      value: categories?.length || 0,
      icon: FolderTree,
      color: 'bg-purple-500',
    },
    {
      label: 'Commandes',
      value: orderStats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      label: 'Revenus',
      value: `${(orderStats?.totalRevenue || 0).toLocaleString('fr-FR')} FCFA`,
      icon: DollarSign,
      color: 'bg-gold',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-gray-800 mb-8">
        Dashboard Administration
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            Statut des commandes
          </h2>
          <div className="space-y-4">
            {orderStats?.ordersByStatus?.map((item: any) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.status === 'PENDING' && (
                    <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                  )}
                  {item.status === 'CONFIRMED' && (
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  )}
                  {item.status === 'SHIPPED' && (
                    <Package className="w-5 h-5 text-purple-500 mr-3" />
                  )}
                  {item.status === 'DELIVERED' && (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  )}
                  {item.status === 'CANCELLED' && (
                    <Clock className="w-5 h-5 text-red-500 mr-3" />
                  )}
                  <span className="text-gray-600">{item.status}</span>
                </div>
                <span className="font-semibold text-gray-800">{item._count}</span>
              </div>
            ))}
            {(!orderStats?.ordersByStatus || orderStats.ordersByStatus.length === 0) && (
              <p className="text-gray-500">Aucune commande pour le moment</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            Produits par catégorie
          </h2>
          <div className="space-y-4">
            {categories?.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <span className="text-gray-600">{category.name}</span>
                <span className="font-semibold text-gray-800">
                  {category._count?.products || 0} produits
                </span>
              </div>
            ))}
            {(!categories || categories.length === 0) && (
              <p className="text-gray-500">Aucune catégorie pour le moment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
