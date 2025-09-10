'use client';

import { CheckCircle, Star, Newspaper, Gift, Users, Crown, CreditCard, ArrowRight, X } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { useEffect } from 'react';

interface VentajasSuscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrarse: () => void;
}

interface Beneficio {
  icono: React.ComponentType<{ className?: string }>;
  titulo: string;
  descripcion: string;
}

export default function VentajasSuscripcionModal({ isOpen, onClose, onRegistrarse }: VentajasSuscripcionModalProps) {
  const { setIsModalOpen } = useModal();

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen, setIsModalOpen]);

  if (!isOpen) return null;

  const beneficios: Beneficio[] = [
    {
      icono: Newspaper,
      titulo: 'Noticias Exclusivas',
      descripcion: 'Acceso a contenido premium y análisis detallados de partidos'
    },
    {
      icono: Gift,
      titulo: 'Descuentos Especiales',
      descripcion: 'Ofertas únicas en productos y servicios de padel'
    },
    {
      icono: Users,
      titulo: 'Comunidad VIP',
      descripcion: 'Acceso a grupos exclusivos de aficionados y jugadores'
    },
    {
      icono: Star,
      titulo: 'Contenido Prioritario',
      descripcion: 'Recibe las noticias más importantes y actualizaciones primero'
    },
    {
      icono: CreditCard,
      titulo: 'Pago Seguro',
      descripcion: 'Procesamiento seguro con Stripe y garantía de devolución'
    },
    {
      icono: Crown,
      titulo: 'Soporte Premium',
      descripcion: 'Atención al cliente prioritaria y asistencia personalizada'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative modal-in shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-bg-300 transition-colors z-10"
          >
            <X className="w-5 h-5 text-text-200" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-100 mb-2">
              ¡Obtén el 35% de Descuento!
            </h2>
            <p className="text-text-200 mb-4">
              Únete a 4PADEL Premium y disfruta de beneficios exclusivos
            </p>
            
            {/* Price highlight */}
            <div className="bg-gradient-to-r from-accent-100/10 to-primary-100/10 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-text-100">€9.99</div>
                  <div className="text-xs text-text-200">Precio con descuento</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-text-200 line-through">€15.99</div>
                  <div className="text-xs text-text-200">Precio original</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">35% OFF</div>
                  <div className="text-xs text-text-200">Ahorro</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {beneficios.map((beneficio, index) => {
              const Icono = beneficio.icono;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-bg-300 rounded-lg hover:bg-bg-200 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                      <Icono className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-100 mb-1 text-sm">
                      {beneficio.titulo}
                    </h3>
                    <p className="text-text-200 text-xs leading-relaxed">
                      {beneficio.descripcion}
                    </p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRegistrarse}
              className="flex-1 bg-gradient-to-r from-primary-100 to-accent-100 text-white py-3 px-4 rounded-lg font-bold hover:from-primary-200 hover:to-accent-200 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <CreditCard className="w-5 h-5" />
              <span>Registrarse con 35% OFF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-3 border border-text-200 text-text-200 rounded-lg font-medium hover:bg-bg-300 hover:text-text-100 transition-all duration-300"
            >
              Tal vez más tarde
            </button>
          </div>

          {/* Security note */}
          <div className="mt-4 text-center">
            <p className="text-text-200 text-xs">
              🔒 Pago 100% seguro procesado por Stripe • Cancelación en cualquier momento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
