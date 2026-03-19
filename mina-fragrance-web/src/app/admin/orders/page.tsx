'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Eye, Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';
import { ordersApi, getImageUrl, getProductImages } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import type { Order } from '@/types';
import toast from 'react-hot-toast';

const statusConfig = {
  PENDING: { label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  CONFIRMED: { label: 'Confirmée', icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
  SHIPPED: { label: 'Expédiée', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Livrée', icon: Package, color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Annulée', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', 'admin'],
    queryFn: ordersApi.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Statut mis à jour');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur');
    },
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-gray-800 mb-8">
        Gestion des Commandes
      </h1>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Commande
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Client
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Total
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Statut
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : orders?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Aucune commande pour le moment
                </td>
              </tr>
            ) : (
              orders?.map((order) => {
                const status = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-800">
                          {order.user?.name || order.guestName || 'Client anonyme'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.user?.email || order.guestEmail || order.phone || ''}
                        </p>
                        {!order.user && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">
                            Invité
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {order.total.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.color}`}
                      >
                        <status.icon className="w-3 h-3 mr-1" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold text-gray-800">
                Commande #{selectedOrder.id.slice(0, 8)}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Client
                {!selectedOrder.user && (
                  <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">
                    Invité
                  </span>
                )}
              </h3>
              <p className="text-gray-600">
                {selectedOrder.user?.name || selectedOrder.guestName || 'Client anonyme'}
              </p>
              <p className="text-gray-500 text-sm">
                {selectedOrder.user?.email || selectedOrder.guestEmail || ''}
              </p>
              {selectedOrder.phone && (
                <p className="text-gray-500 text-sm mt-2">Tel: {selectedOrder.phone}</p>
              )}
              {selectedOrder.address && (
                <p className="text-gray-500 text-sm">Adresse: {selectedOrder.address}</p>
              )}
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Produits commandés</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {item.product ? (
                        <Image
                          src={getImageUrl(getProductImages(item.product.images)[0])}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">
                        {item.product?.name || 'Produit supprimé'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.price.toLocaleString('fr-FR')} FCFA x {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800 flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-xl text-rose-500">
                  {selectedOrder.total.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Mettre à jour le statut</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() =>
                      updateStatusMutation.mutate({ id: selectedOrder.id, status: key })
                    }
                    disabled={selectedOrder.status === key}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedOrder.status === key
                        ? config.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <config.icon className="w-4 h-4 mr-2" />
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
