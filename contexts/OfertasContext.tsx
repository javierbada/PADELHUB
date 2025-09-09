'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OfertasContextType {
  isOfertaVisible: boolean;
  personasRegistradas: number;
  maxPersonas: number;
  descuento: number;
  cerrarOferta: () => void;
  registrarPersona: () => void;
  isUsuarioRegistrado: boolean;
  personasRestantes: number;
  porcentajeCompletado: number;
}

const OfertasContext = createContext<OfertasContextType | undefined>(undefined);

export function OfertasProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isOfertaVisible, setIsOfertaVisible] = useState(true);
  const [personasRegistradas, setPersonasRegistradas] = useState(0);
  const [isUsuarioRegistrado, setIsUsuarioRegistrado] = useState(false);
  
  const maxPersonas: number = 25;
  const descuento: number = 35;

  useEffect((): void => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return;
    
    // Simular personas ya registradas (en producción esto vendría de una API)
    const personasIniciales: number = Math.floor(Math.random() * 15) + 5; // Entre 5 y 19
    setPersonasRegistradas(personasIniciales);
    
    // Verificar si el usuario ya se registró en esta oferta
    const usuarioRegistrado: string | null = localStorage.getItem('padelhub_oferta_registrado');
    if (usuarioRegistrado) {
      setIsUsuarioRegistrado(true);
    }
    
    // Verificar si la oferta fue cerrada manualmente
    const ofertaCerrada: string | null = localStorage.getItem('padelhub_oferta_cerrada');
    if (ofertaCerrada) {
      setIsOfertaVisible(false);
    }
  }, []);

  const cerrarOferta = (): void => {
    setIsOfertaVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('padelhub_oferta_cerrada', 'true');
    }
  };

  const registrarPersona = (): void => {
    if (personasRegistradas < maxPersonas && !isUsuarioRegistrado) {
      setPersonasRegistradas(prev => prev + 1);
      setIsUsuarioRegistrado(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('padelhub_oferta_registrado', 'true');
      }
    }
  };

  const personasRestantes: number = Math.max(0, maxPersonas - personasRegistradas);
  const porcentajeCompletado: number = Math.min(100, Math.max(0, Math.round((personasRegistradas / maxPersonas) * 100)));

  return (
    <OfertasContext.Provider value={{
      isOfertaVisible,
      personasRegistradas,
      maxPersonas,
      descuento,
      cerrarOferta,
      registrarPersona,
      isUsuarioRegistrado,
      personasRestantes,
      porcentajeCompletado
    }}>
      {children}
    </OfertasContext.Provider>
  );
}

export function useOfertas(): OfertasContextType {
  const context = useContext(OfertasContext);
  if (context === undefined) {
    throw new Error('useOfertas must be used within an OfertasProvider');
  }
  return context;
}
