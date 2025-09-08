'use client';

import { useState } from 'react';
import { Trophy, Calendar, BarChart3, Newspaper, Menu, X } from 'lucide-react';

// TODO: Implementar navegación activa y ruteo con Next.js router
// FIXME: Agregar estado activo para la navegación actual

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavigationItem[] = [
  { name: 'Partidos', href: '/partidos', icon: Calendar },
  { name: 'Competiciones', href: '/competiciones', icon: Trophy },
  { name: 'Rankings', href: '/rankings', icon: BarChart3 },
  { name: 'Noticias', href: '/noticias', icon: Newspaper },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-100/95 backdrop-blur-md border-b border-bg-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">4PADEL</h1>
              <p className="text-xs text-text-200 hidden sm:block">Professional Padel Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-text-200 hover:text-text-100 hover:bg-bg-200 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-200 hover:text-text-100 hover:bg-bg-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-bg-300 animate-slide-in">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-200 hover:text-text-100 hover:bg-bg-200 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}