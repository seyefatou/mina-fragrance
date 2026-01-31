'use client';

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
      transform hover:-translate-y-0.5 active:translate-y-0
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-rose-500 to-rose-600 text-white
        hover:from-rose-600 hover:to-rose-700
        focus:ring-rose-500
        shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30
      `,
      secondary: `
        bg-white/80 backdrop-blur-sm text-rose-600 border-2 border-rose-200
        hover:bg-rose-50 hover:border-rose-300
        focus:ring-rose-500
        shadow-sm hover:shadow-md
      `,
      gold: `
        bg-gradient-to-r from-gold to-gold-dark text-white
        hover:from-gold-dark hover:to-gold
        focus:ring-gold
        shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-red-600 text-white
        hover:from-red-600 hover:to-red-700
        focus:ring-red-500
        shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30
      `,
      ghost: `
        bg-transparent text-gray-600
        hover:bg-gray-100 hover:text-gray-900
        focus:ring-gray-300
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
