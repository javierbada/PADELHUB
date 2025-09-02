import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import DaySelector from '@/components/sections/DaySelector';
import PartidosDelDia from '@/components/sections/PartidosDelDia';
import ProximosTorneos from '@/components/sections/ProximosTorneos';
import RankingsPreview from '@/components/sections/RankingsPreview';
import CompeticionesDestacadas from '@/components/sections/CompeticionesDestacadas';
import NoticiasDestacadas from '@/components/sections/NoticiasDestacadas';

// TODO: Implementar sistema de rutas con Next.js para navegación entre secciones
// FIXME: Agregar sistema de estado global para compartir datos entre componentes

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section con estadísticas generales */}
        <HeroSection />
        
        {/* Selector de días para filtrar partidos */}
        <DaySelector />
        
        {/* Partidos del día seleccionado */}
        <PartidosDelDia />
        
        {/* Próximos torneos de todas las competiciones */}
        <ProximosTorneos />
        
        {/* Preview de rankings principales */}
        <RankingsPreview />
        
        {/* Competiciones destacadas */}
        <CompeticionesDestacadas />
        
        {/* Noticias más recientes */}
        <NoticiasDestacadas />
      </main>
      
      {/* Footer */}
      <footer className="bg-bg-200 border-t border-bg-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PH</span>
              </div>
              <h3 className="text-xl font-bold text-gradient">PadelHub</h3>
            </div>
            <p className="text-text-200 mb-6">
              La plataforma definitiva para seguir el padel profesional mundial
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-200">
              <span>Premier Padel</span>
              <span>•</span>
              <span>Padel Pro League</span>
              <span>•</span>
              <span>A1 Padel</span>
              <span>•</span>
              <span>Padel FIP</span>
              <span>•</span>
              <span>Hexagon Cup</span>
            </div>
            <div className="mt-8 pt-8 border-t border-bg-300 text-text-200 text-sm">
              <p>&copy; 2024 PadelHub. Plataforma no oficial de seguimiento de competiciones de padel.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}