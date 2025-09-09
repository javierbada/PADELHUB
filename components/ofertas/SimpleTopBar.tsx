'use client';

import { useState } from 'react';
import { X, Gift, Star } from 'lucide-react';
import SuscripcionModal from './SuscripcionModal';

export default function SimpleTopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showSuscripcionModal, setShowSuscripcionModal] = useState(false);

  if (!isVisible) return null;

  return (
    <>
    <div className="relative bg-gradient-to-r from-accent-100 via-primary-100 to-accent-100 overflow-hidden animate-slide-down">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left side - Main offer */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-white animate-bounce" />
                <span className="text-white font-bold text-sm sm:text-base">
                  ¡OFERTA ESPECIAL!
                </span>
              </div>
              
              <div className="hidden sm:flex items-center space-x-2 text-white">
                <span className="text-2xl sm:text-3xl font-black">
                  35%
                </span>
                <span className="text-sm sm:text-base">
                  de descuento
                </span>
              </div>
              
              <div className="text-white text-xs sm:text-sm">
                <span className="hidden sm:inline">para las primeras </span>
                <span className="font-bold">25 personas</span>
              </div>
            </div>

            {/* Right side - Action button */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowSuscripcionModal(true)}
                className="px-4 py-2 bg-white text-accent-100 rounded-full text-sm font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Star className="w-4 h-4" />
                <span>¡Quiero el 35%!</span>
              </button>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
    </div>

    {/* Modal de Suscripción */}
    <SuscripcionModal
      isOpen={showSuscripcionModal}
      onClose={() => setShowSuscripcionModal(false)}
    />
    </>
  );
}
