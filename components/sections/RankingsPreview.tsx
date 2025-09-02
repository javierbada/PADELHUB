'use client';

import { TrendingUp, Medal, Users, Award } from 'lucide-react';

// TODO: Conectar con API para obtener rankings reales de jugadores
// FIXME: Implementar filtros por competición y categoría (masculino/femenino)

interface Jugador {
  id: string;
  nombre: string;
  apellido: string;
  posicion: number;
  puntos: number;
  pais: string;
  cambio: number; // cambio en posiciones desde último ranking
}

interface RankingCompeticion {
  id: string;
  nombre: string;
  categoria: 'masculino' | 'femenino';
  jugadores: Jugador[];
}

export default function RankingsPreview() {
  // FIXME: Reemplazar con datos reales de la API de rankings
  const rankings: RankingCompeticion[] = [
    {
      id: 'premier-masculino',
      nombre: 'Premier Padel',
      categoria: 'masculino',
      jugadores: [
        { id: '1', nombre: 'Arturo', apellido: 'Coello', posicion: 1, puntos: 12500, pais: 'ESP', cambio: 0 },
        { id: '2', nombre: 'Agustín', apellido: 'Tapia', posicion: 2, puntos: 11800, pais: 'ARG', cambio: 1 },
        { id: '3', nombre: 'Juan', apellido: 'Lebrón', posicion: 3, puntos: 10200, pais: 'ESP', cambio: -1 },
      ]
    }
  ];

  const getRankingIcon = (posicion: number) => {
    switch (posicion) {
      case 1: return <Medal className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-text-200 text-sm font-bold">{posicion}</span>;
    }
  };

  const getChangeIcon = (cambio: number) => {
    if (cambio > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (cambio < 0) return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-primary-100" />
          <h2 className="text-2xl font-bold text-text-100">Rankings</h2>
        </div>
        <button className="text-primary-100 hover:text-primary-200 font-medium transition-colors">
          Ver rankings completos →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {rankings.map((ranking) => (
          <div key={ranking.id} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-text-100">{ranking.nombre}</h3>
                <p className="text-text-200 capitalize">{ranking.categoria}</p>
              </div>
              <Users className="w-6 h-6 text-accent-100" />
            </div>

            <div className="space-y-4">
              {ranking.jugadores.map((jugador) => (
                <div key={jugador.id} className="flex items-center justify-between p-4 bg-bg-100 rounded-lg hover:bg-bg-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getRankingIcon(jugador.posicion)}
                    <div>
                      <div className="font-semibold text-text-100">
                        {jugador.nombre} {jugador.apellido}
                      </div>
                      <div className="text-text-200 text-sm">{jugador.pais}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-text-100">{jugador.puntos.toLocaleString()}</div>
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(jugador.cambio)}
                      <span className={`text-sm ${
                        jugador.cambio > 0 ? 'text-green-400' :
                        jugador.cambio < 0 ? 'text-red-400' : 'text-text-200'
                      }`}>
                        {jugador.cambio !== 0 && (jugador.cambio > 0 ? '+' : '')}{jugador.cambio || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}