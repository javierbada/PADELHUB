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
  
  const maxPersonas = 25;
  const descuento = 35;

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return;
    
    // Simular personas ya registradas (en producción esto vendría de una API)
    const personasIniciales = Math.floor(Math.random() * 15) + 5; // Entre 5 y 19
    setPersonasRegistradas(personasIniciales);
    
    // Verificar si el usuario ya se registró en esta oferta
    const usuarioRegistrado = localStorage.getItem('padelhub_oferta_registrado');
    if (usuarioRegistrado) {
      setIsUsuarioRegistrado(true);
    }
    
    // Verificar si la oferta fue cerrada manualmente
    const ofertaCerrada = localStorage.getItem('padelhub_oferta_cerrada');
    if (ofertaCerrada) {
      setIsOfertaVisible(false);
    }
  }, []);

  const cerrarOferta = () => {
    setIsOfertaVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('padelhub_oferta_cerrada', 'true');
    }
  };

  const registrarPersona = () => {
    if (personasRegistradas < maxPersonas && !isUsuarioRegistrado) {
      setPersonasRegistradas(prev => prev + 1);
      setIsUsuarioRegistrado(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('padelhub_oferta_registrado', 'true');
      }
    }
  };

  const personasRestantes = Math.max(0, maxPersonas - personasRegistradas);
  const porcentajeCompletado = Math.min(100, Math.max(0, Math.round((personasRegistradas / maxPersonas) * 100)));

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
