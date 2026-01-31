import Link from 'next/link';
import { Heart, Instagram, MapPin, Phone, ArrowRight, MessageCircle } from 'lucide-react';

// Custom TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

// Custom Snapchat Icon
function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.732-.27-1.273-.63-1.303-1.079-.016-.255.15-.494.404-.645.12-.074.284-.135.465-.164.12-.016.255-.03.39-.03.12 0 .254.015.374.045.297.06.596.165.87.285.167.06.314.075.435.06a.601.601 0 0 0 .12-.015c-.015-.18-.03-.36-.045-.555v-.06c-.105-1.629-.233-3.654.297-4.847C7.843 1.084 11.2.793 12.191.793h.015z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-5">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12">
                <img
                  src="/logo.png"
                  alt="MinaaFragrance"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold">
                  <span className="text-rose-400">Minaa</span>
                  <span className="text-gold ml-1">Fragrance</span>
                </span>
                <p className="text-xs text-gray-400 italic">
                  "Votre monde, parfumé à la perfection"
                </p>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Découvrez notre collection exclusive de parfums, brumes, soins du corps
              et déodorants. Qualité premium pour sublimer votre beauté au quotidien.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/MinaaFragrance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-rose-500 to-orange-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-rose-500/25"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://tiktok.com/@minaaFragrance1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20"
              >
                <TikTokIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://snapchat.com/add/minadiop2685"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/25"
              >
                <SnapchatIcon className="w-5 h-5 text-black" />
              </a>
              <a
                href="https://wa.me/221779697557"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Boutique</h4>
            <ul className="space-y-3">
              {[
                { href: '/categories/parfums-brumes', label: 'Parfums & Brumes' },
                { href: '/categories/soins-corps', label: 'Soins du Corps' },
                { href: '/categories/deodorants', label: 'Déodorants' },
                { href: '/products', label: 'Tous les produits' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Livraison' },
                { href: '#', label: 'Retours' },
                { href: '#', label: 'Paiement' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
                  <a
                    href="https://wa.me/221779697557"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    +221 77 969 75 57
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Instagram className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Instagram</p>
                  <a
                    href="https://instagram.com/MinaaFragrance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-rose-400 transition-colors"
                  >
                    @MinaaFragrance
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Localisation</p>
                  <a
                    href="https://www.google.com/maps/search/Dalal+Diam+Dakar+Sénégal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-rose-400 transition-colors"
                  >
                    Dalal Diam, Dakar, Sénégal
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 MinaaFragrance. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            Fait avec{' '}
            <Heart className="w-4 h-4 mx-1.5 text-rose-500 animate-pulse" />{' '}
            pour <span className="text-rose-400 ml-1">Minaa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
