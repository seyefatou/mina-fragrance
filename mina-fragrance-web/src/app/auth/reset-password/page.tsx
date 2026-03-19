'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      await authApi.resetPassword(token, formData.newPassword);
      toast.success('Mot de passe réinitialisé avec succès!');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Token invalide ou expiré');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-800 mb-4">
            Lien invalide
          </h1>
          <p className="text-gray-500 mb-6">
            Ce lien de réinitialisation est invalide ou a expiré.
          </p>
          <Link
            href="/auth/forgot-password"
            className="text-rose-500 hover:text-rose-600 font-medium"
          >
            Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <span className="font-serif text-2xl font-bold text-rose-600">Mina</span>
              <span className="font-serif text-2xl text-gold">Fragrance</span>
            </Link>
            <h1 className="font-serif text-2xl font-bold text-gray-800">
              Nouveau mot de passe
            </h1>
            <p className="text-gray-500 mt-2">
              Choisissez votre nouveau mot de passe
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="newPassword"
              type="password"
              label="Nouveau mot de passe"
              placeholder="••••••••"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Réinitialiser
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-rose-500 hover:text-rose-600 font-medium text-sm">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
