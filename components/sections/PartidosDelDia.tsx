'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

// TODO: Conectar con API para obtener partidos del día seleccionado
// FIXME: Implementar estado de carga y manejo de errores

interface Partido {
  id: string;
  jugador1: string;
  jugador2: string;
  jugador3: string;
  jugador4: string;
  hora: string;
  lugar: string;
  competicion: string;
  estado: 'programado' | 'en_vivo' | 'finalizado';
}

export default function PartidosDelDia() {
  // FIXME: Reemplazar con llamada real a la API
  const partidosHoy: Partido[] = [];
  
  const hasMatches = partidosHoy.length > 0;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-100">Partidos del día</h2>
        <button className="text-primary-100 hover:text-primary-200 font-medium transition-colors">
          Todas las competiciones →
        </button>
      </div>

      {!hasMatches ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-text-200 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-text-100 mb-2">
            No hay partidos programados hoy
          </h3>
          <p className="text-text-200">
            Explora los próximos torneos oficiales
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TODO: Mapear partidos reales desde la API */}
          {partidosHoy.map((partido) => (
            <div key={partido.id} className="glass-card rounded-xl p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-accent-100 text-white text-xs font-medium rounded-full">
                      {partido.competicion}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      partido.estado === 'en_vivo' ? 'bg-red-500 text-white' :
                      partido.estado === 'finalizado' ? 'bg-green-500 text-white' :
                      'bg-bg-300 text-text-200'
                    }`}>
                      {partido.estado === 'en_vivo' ? 'En Vivo' : 
                       partido.estado === 'finalizado' ? 'Finalizado' : 'Programado'}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-text-100">
                    {partido.jugador1} / {partido.jugador2} vs {partido.jugador3} / {partido.jugador4}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-text-200 text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{partido.hora}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{partido.lugar}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}