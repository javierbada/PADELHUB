'use client';

import { CheckCircle, Star, Newspaper, Gift, Users, Crown } from 'lucide-react';

interface BeneficiosSuscripcionProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Beneficio {
  icono: React.ComponentType<{ className?: string }>;
  titulo: string;
  descripcion: string;
}

export default function BeneficiosSuscripcion({ isVisible, onClose }: BeneficiosSuscripcionProps) {
  if (!isVisible) return null;

  const beneficios: Beneficio[] = [
    {
      icono: Newspaper,
      titulo: 'Noticias Exclusivas',
      descripcion: 'Acceso a contenido premium y análisis detallados'
    },
    {
      icono: Gift,
      titulo: 'Descuentos Especiales',
      descripcion: 'Ofertas únicas en productos y servicios de padel'
    },
    {
      icono: Users,
      titulo: 'Comunidad VIP',
      descripcion: 'Acceso a grupos exclusivos de aficionados'
    },
    {
      icono: Star,
      titulo: 'Contenido Prioritario',
      descripcion: 'Recibe las noticias más importantes primero'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-auto">
        <div className="glass-card rounded-2xl p-8 relative modal-in shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-100 mb-2">
              ¡Bienvenido a 4PADEL Premium!
            </h2>
            <p className="text-text-200">
              Con tu suscripción tendrás acceso a beneficios exclusivos
            </p>
          </div>

          {/* Benefits list */}
          <div className="space-y-4 mb-8">
            {beneficios.map((beneficio, index) => {
              const Icono = beneficio.icono;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 bg-bg-300 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                      <Icono className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-100 mb-1">
                      {beneficio.titulo}
                    </h3>
                    <p className="text-text-200 text-sm">
                      {beneficio.descripcion}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary-100 to-accent-100 text-white py-3 rounded-lg font-semibold hover:from-primary-200 hover:to-accent-200 transition-all duration-300"
            >
              ¡Comenzar a disfrutar!
            </button>
            <p className="text-text-200 text-xs mt-3">
              Tu suscripción se activará automáticamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
