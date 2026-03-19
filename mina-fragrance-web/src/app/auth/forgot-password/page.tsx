'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.forgotPassword(email);
      setResetToken(response.resetToken);
      setIsSent(true);
      toast.success('Lien de réinitialisation généré!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la demande');
    } finally {
      setIsLoading(false);
    }
  };

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
              Mot de passe oublié
            </h1>
            <p className="text-gray-500 mt-2">
              Entrez votre email pour réinitialiser votre mot de passe
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" isLoading={isLoading} className="w-full">
                Réinitialiser le mot de passe
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 text-sm">
                  Un lien de réinitialisation a été généré. Cliquez sur le lien ci-dessous pour changer votre mot de passe.
                </p>
              </div>
              <Link
                href={`/auth/reset-password?token=${resetToken}`}
                className="block w-full text-center px-4 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
              >
                Réinitialiser mon mot de passe
              </Link>
            </div>
          )}

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
