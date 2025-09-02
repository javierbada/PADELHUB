'use client';

import { Clock, ExternalLink, MessageCircle } from 'lucide-react';

// TODO: Conectar con API para obtener las últimas noticias de padel
// FIXME: Implementar sistema de categorías y filtros de noticias

interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  categoria: string;
  fechaPublicacion: string;
  autor: string;
  imagen?: string;
  comentarios: number;
  lecturas: number;
}

export default function NoticiasDestacadas() {
  // FIXME: Reemplazar con datos reales de la API de noticias
  const noticias: Noticia[] = [
    {
      id: '1',
      titulo: 'Coello y Tapia dominan el ranking mundial tras la temporada 2024',
      resumen: 'Los números 1 del ranking mundial consolidan su posición después de una temporada espectacular...',
      categoria: 'Rankings',
      fechaPublicacion: '2024-09-02',
      autor: 'Carlos Martínez',
      comentarios: 24,
      lecturas: 1250
    },
    {
      id: '2', 
      titulo: 'A1 Padel anuncia nuevos torneos para la temporada 2025',
      resumen: 'La competición americana confirma su expansión con nuevas sedes en Sudamérica...',
      categoria: 'Competiciones',
      fechaPublicacion: '2024-09-01',
      autor: 'María González',
      comentarios: 18,
      lecturas: 980
    },
    {
      id: '3',
      titulo: 'Hexagon Cup: El nuevo formato que revoluciona el padel',
      resumen: 'Conoce todos los detalles del innovador formato de competición que está cambiando el deporte...',
      categoria: 'Innovación',
      fechaPublicacion: '2024-08-31',
      autor: 'Ana Rodríguez',
      comentarios: 45,
      lecturas: 2100
    }
  ];

  const formatearFecha = (fecha: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-accent-100" />
          <h2 className="text-2xl font-bold text-text-100">Noticias Destacadas</h2>
        </div>
        <button className="text-primary-100 hover:text-primary-200 font-medium transition-colors">
          Todas las noticias →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <article 
            key={noticia.id}
            className="glass-card rounded-xl overflow-hidden hover-lift group cursor-pointer"
          >
            {/* TODO: Agregar imágenes reales de noticias cuando estén disponibles en la API */}
            <div className="aspect-video bg-gradient-to-br from-bg-300 to-bg-200 flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-text-200 opacity-50" />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-accent-100 text-white text-xs font-medium rounded-full">
                  {noticia.categoria}
                </span>
                <span className="text-text-200 text-xs flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatearFecha(noticia.fechaPublicacion)}</span>
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-text-100 mb-3 group-hover:text-primary-100 transition-colors line-clamp-2">
                {noticia.titulo}
              </h3>
              
              <p className="text-text-200 text-sm mb-4 line-clamp-3">
                {noticia.resumen}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-200">
                <span>Por {noticia.autor}</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{noticia.comentarios}</span>
                  </span>
                  <span>{noticia.lecturas} lecturas</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}