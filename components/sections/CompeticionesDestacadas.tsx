'use client';

import { Trophy, Calendar, MapPin, Star } from 'lucide-react';

// TODO: Conectar con API para obtener información actualizada de todas las competiciones
// FIXME: Implementar enlaces a páginas específicas de cada competición

interface Competicion {
  id: string;
  nombre: string;
  descripcion: string;
  proximoEvento?: string;
  ubicacionProxima?: string;
  fechaProxima?: string;
  nivel: 'P1' | 'P2' | 'Major' | 'Open' | 'Masters';
  activa: boolean;
}

const nivelesColores = {
  'P1': 'bg-red-500',
  'P2': 'bg-orange-500', 
  'Major': 'bg-purple-500',
  'Open': 'bg-blue-500',
  'Masters': 'bg-green-500',
};

export default function CompeticionesDestacadas() {
  // FIXME: Reemplazar con datos reales de la API de competiciones
  const competiciones: Competicion[] = [
    {
      id: 'premier-padel',
      nombre: 'Premier Padel',
      descripcion: 'El circuito profesional más prestigioso del mundo del padel',
      proximoEvento: 'Milano Premier Padel P1',
      ubicacionProxima: 'Milano, Italy',
      fechaProxima: '2024-09-29',
      nivel: 'P1',
      activa: true
    },
    {
      id: 'padel-pro-league',
      nombre: 'Padel Pro League',
      descripcion: 'Liga profesional con formato innovador de equipos',
      proximoEvento: 'Final Season 2024',
      ubicacionProxima: 'Madrid, Spain', 
      fechaProxima: '2024-10-15',
      nivel: 'Major',
      activa: true
    },
    {
      id: 'a1-padel',
      nombre: 'A1 Padel',
      descripcion: 'Circuito americano de padel de alto nivel',
      proximoEvento: 'A1 Padel Panama',
      ubicacionProxima: 'Panama City, Panama',
      fechaProxima: '2024-10-18',
      nivel: 'Open',
      activa: true
    },
    {
      id: 'padel-fip',
      nombre: 'Padel FIP',
      descripcion: 'Federación Internacional de Padel - Torneos oficiales',
      proximoEvento: 'FIP World Championship',
      ubicacionProxima: 'Dubai, UAE',
      fechaProxima: '2024-11-12',
      nivel: 'Major',
      activa: true
    },
    {
      id: 'hexagon-cup',
      nombre: 'Hexagon Cup',
      descripcion: 'Formato revolucionario de competición por equipos',
      proximoEvento: 'Hexagon Finals',
      ubicacionProxima: 'Barcelona, Spain',
      fechaProxima: '2024-12-01',
      nivel: 'Masters',
      activa: true
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Star className="w-6 h-6 text-primary-100" />
          <h2 className="text-2xl font-bold text-text-100">Competiciones</h2>
        </div>
        <button className="text-primary-100 hover:text-primary-200 font-medium transition-colors">
          Ver todas →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competiciones.map((competicion) => (
          <div 
            key={competicion.id}
            className="glass-card rounded-xl p-6 hover-lift group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent-100" />
                <span className={`px-2 py-1 text-white text-xs font-medium rounded ${nivelesColores[competicion.nivel]}`}>
                  {competicion.nivel}
                </span>
              </div>
              {competicion.activa && (
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>

            <h3 className="text-lg font-bold text-text-100 mb-2 group-hover:text-primary-100 transition-colors">
              {competicion.nombre}
            </h3>
            
            <p className="text-text-200 text-sm mb-4 line-clamp-2">
              {competicion.descripcion}
            </p>

            {competicion.proximoEvento && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-text-100">
                  Próximo evento:
                </div>
                <div className="text-sm text-primary-100">
                  {competicion.proximoEvento}
                </div>
                <div className="flex items-center space-x-4 text-text-200 text-xs">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{competicion.fechaProxima}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{competicion.ubicacionProxima}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}