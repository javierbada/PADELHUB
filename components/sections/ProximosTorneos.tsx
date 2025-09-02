'use client';

import { Calendar, MapPin, Trophy, Users } from 'lucide-react';

// TODO: Conectar con API para obtener próximos torneos de todas las competiciones
// FIXME: Implementar filtrado por competición y fechas

interface Torneo {
  id: string;
  nombre: string;
  competicion: 'Premier Padel' | 'Padel Pro League' | 'A1 Padel' | 'Padel FIP' | 'Hexagon Cup';
  fecha: string;
  ubicacion: string;
  ciudad: string;
  participantes?: number;
  premios?: string;
}

const competicionColors = {
  'Premier Padel': 'bg-red-500',
  'Padel Pro League': 'bg-blue-500', 
  'A1 Padel': 'bg-green-500',
  'Padel FIP': 'bg-yellow-500',
  'Hexagon Cup': 'bg-purple-500',
};

export default function ProximosTorneos() {
  // FIXME: Reemplazar con datos reales de la API
  const proximosTorneos: Torneo[] = [
    {
      id: '1',
      nombre: 'Milano Premier Padel P1',
      competicion: 'Premier Padel',
      fecha: '29 sept',
      ubicacion: 'Milano, Italy',
      ciudad: 'Milano',
      participantes: 64,
      premios: '€500,000'
    },
    {
      id: '2', 
      nombre: 'A1 Padel Panama',
      competicion: 'A1 Padel',
      fecha: '18 oct',
      ubicacion: 'Panama City, Panama',
      ciudad: 'Panama City',
      participantes: 32,
      premios: '$150,000'
    },
    {
      id: '3',
      nombre: 'A1 Padel El Salvador', 
      competicion: 'A1 Padel',
      fecha: '23 oct',
      ubicacion: 'San Salvador, El Salvador',
      ciudad: 'San Salvador',
      participantes: 32,
      premios: '$100,000'
    },
    {
      id: '4',
      nombre: 'Nueva Giza Premier Padel P1',
      competicion: 'Premier Padel', 
      fecha: '27 oct',
      ubicacion: 'Nueva Giza, Egypt',
      ciudad: 'Nueva Giza',
      participantes: 64,
      premios: '€750,000'
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-accent-100" />
          <h2 className="text-2xl font-bold text-text-100">Próximos Torneos</h2>
        </div>
        <button className="text-primary-100 hover:text-primary-200 font-medium transition-colors">
          Ver todos →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {proximosTorneos.map((torneo) => (
          <div 
            key={torneo.id} 
            className="glass-card rounded-xl p-6 hover-lift group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${competicionColors[torneo.competicion]}`}>
                {torneo.competicion}
              </span>
              <span className="text-text-200 text-sm font-semibold">
                {torneo.fecha}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-text-100 mb-3 group-hover:text-primary-100 transition-colors">
              {torneo.nombre}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-text-200 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{torneo.ubicacion}</span>
              </div>
              
              {torneo.participantes && (
                <div className="flex items-center space-x-2 text-text-200 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{torneo.participantes} equipos</span>
                </div>
              )}
              
              {torneo.premios && (
                <div className="flex items-center space-x-2 text-primary-100 text-sm font-semibold">
                  <Trophy className="w-4 h-4" />
                  <span>{torneo.premios}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}