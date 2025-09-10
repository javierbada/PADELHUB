'use client';

import { useState, useEffect } from 'react';
import { X, Users, Clock, Gift, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { useOfertas } from '@/contexts/OfertasContext';
import SuscripcionModal from './SuscripcionModal';

export default function TopBarOfertas() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuscripcionModal, setShowSuscripcionModal] = useState(false);

  const {
    isOfertaVisible,
    personasRegistradas,
    maxPersonas,
    descuento,
    cerrarOferta,
    registrarPersona,
    isUsuarioRegistrado,
    personasRestantes,
    porcentajeCompletado
  } = useOfertas();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegistro = () => {
    if (personasRestantes > 0 && !isUsuarioRegistrado) {
      setShowSuscripcionModal(true);
    }
  };

  if (!isMounted || !isOfertaVisible) return null;

  const isOfertaCompleta = personasRegistradas >= maxPersonas;
  const isOfertaCasiCompleta = personasRestantes <= 5;

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
                  {descuento}%
                </span>
                <span className="text-sm sm:text-base">
                  de descuento
                </span>
              </div>
              
              <div className="text-white text-xs sm:text-sm">
                <span className="hidden sm:inline">para las primeras </span>
                <span className="font-bold">{maxPersonas}personas</span>
              </div>
            </div>

            {/* Center - Progress bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
              <div className="flex items-center space-x-2 text-white">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {personasRegistradas}/{maxPersonas}
                </span>
              </div>
              
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                  style={{ width: `${porcentajeCompletado}%` }}
                />
              </div>
              
              <div className="text-white text-xs">
                {isOfertaCompleta ? (
                  <span className="flex items-center space-x-1 text-red-200">
                    <AlertCircle className="w-3 h-3" />
                    <span>¡Agotado!</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{personasRestantes} restantes</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right side - Action button */}
            <div className="flex items-center space-x-3">
              {isUsuarioRegistrado ? (
                <div className="flex items-center space-x-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">¡Registrado!</span>
                </div>
              ) : isOfertaCompleta ? (
                <div className="flex items-center space-x-2 text-red-200">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Oferta agotada</span>
                </div>
              ) : (
                <button
                  onClick={handleRegistro}
                  disabled={isOfertaCompleta}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform ${
                    isAnimating 
                      ? 'bg-green-500 text-white scale-110' 
                      : isOfertaCasiCompleta
                        ? 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'
                        : 'bg-white text-accent-100 hover:bg-gray-100 hover:scale-105'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isAnimating ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>¡Registrado!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>¡Quiero el {descuento}%!</span>
                    </div>
                  )}
                </button>
              )}

              {/* Close button */}
              <button
                onClick={cerrarOferta}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile progress bar */}
          <div className="md:hidden pb-2">
            <div className="flex items-center justify-between text-white text-xs mb-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{personasRegistradas}/{maxPersonas} registradas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{personasRestantes} restantes</span>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-white rounded-full h-1 transition-all duration-500 ease-out"
                style={{ width: `${porcentajeCompletado}%` }}
              />
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
