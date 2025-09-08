'use client';

import { Play, TrendingUp, Users, Trophy } from 'lucide-react';

// TODO: Conectar con API para obtener estadísticas en tiempo real
// FIXME: Implementar contador dinámico de estadísticas

interface Estadistica {
  label: string;
  valor: string;
  icono: React.ComponentType<{ className?: string }>;
  cambio?: string;
}

export default function HeroSection() {
  // FIXME: Reemplazar con datos reales de la API de estadísticas
  const estadisticas: Estadistica[] = [
    { label: 'Partidos Esta Semana', valor: '247', icono: Play, cambio: '+12%' },
    { label: 'Jugadores Activos', valor: '1,284', icono: Users, cambio: '+8%' },
    { label: 'Torneos Activos', valor: '15', icono: Trophy, cambio: '+3' },
    { label: 'Países Participantes', valor: '28', icono: TrendingUp, cambio: '+2' },
  ];

  return (
    <section className="py-16 mb-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">4PADEL</span>
        </h1>
        <p className="text-xl text-text-200 max-w-3xl mx-auto mb-8 leading-relaxed">
          Tu fuente definitiva para resultados, rankings y noticias de todas las competiciones profesionales de padel
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-text-200">
          <span className="px-4 py-2 bg-bg-200 rounded-full">Premier Padel</span>
          <span className="px-4 py-2 bg-bg-200 rounded-full">Padel Pro League</span>
          <span className="px-4 py-2 bg-bg-200 rounded-full">A1 Padel</span>
          <span className="px-4 py-2 bg-bg-200 rounded-full">Padel FIP</span>
          <span className="px-4 py-2 bg-bg-200 rounded-full">Hexagon Cup</span>
        </div>
      </div>

      {/* Estadísticas en tiempo real */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {estadisticas.map((stat) => {
          const Icono = stat.icono;
          return (
            <div key={stat.label} className="glass-card rounded-xl p-6 text-center hover-lift">
              <Icono className="w-8 h-8 text-primary-100 mx-auto mb-3" />
              <div className="text-2xl font-bold text-text-100 mb-1">{stat.valor}</div>
              <div className="text-text-200 text-sm mb-2">{stat.label}</div>
              {stat.cambio && (
                <div className="text-green-400 text-xs font-medium">{stat.cambio}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}