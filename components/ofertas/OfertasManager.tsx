'use client';

import React, { useState, useEffect } from 'react';
import { useOfertas } from '@/contexts/OfertasContext';
import BeneficiosSuscripcion from './BeneficiosSuscripcion';

export default function OfertasManager() {
  const [isMounted, setIsMounted] = useState(false);
  const [showBeneficios, setShowBeneficios] = useState(false);
  
  const { isUsuarioRegistrado } = useOfertas();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para mostrar beneficios automáticamente
  useEffect(() => {
    if (!isMounted) return;
    
    if (isUsuarioRegistrado) {
      const timer = setTimeout(() => {
        setShowBeneficios(true);
      }, 1000); // Mostrar después de 1 segundo
      
      return () => clearTimeout(timer);
    }
  }, [isUsuarioRegistrado, isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <BeneficiosSuscripcion 
        isVisible={showBeneficios}
        onClose={() => setShowBeneficios(false)}
      />
    </>
  );
}
