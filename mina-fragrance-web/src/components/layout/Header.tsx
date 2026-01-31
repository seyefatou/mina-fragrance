'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore, useCartStore } from '@/lib/store';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Boutique' },
    { href: '/categories/parfums-brumes', label: 'Parfums & Brumes' },
    { href: '/categories/soins-corps', label: 'Soins Corps' },
    { href: '/categories/deodorants', label: 'Déodorants' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-elegant border-b border-white/50'
          : 'bg-white/50 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 relative">
              <img
                src="/logo.png"
                alt="MinaaFragrance"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                  Minaa
                </span>
                <span className="text-gold">Fragrance</span>
              </span>
              <span className="text-[10px] text-gray-500 italic hidden sm:block">
                Votre monde, parfumé à la perfection
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  pathname === link.href
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50/50'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-lg shadow-rose-500/30 animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-rose-500/25">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-elegant-lg py-2 hidden group-hover:block border border-white/50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {isAdmin() && (
                    <Link
                      href="/admin"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-400" />
                      Administration
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-gray-400" />
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Connexion</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in-down">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all animate-fade-in-up ${
                    pathname === link.href
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
