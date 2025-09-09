'use client';

import { useState, useEffect } from 'react';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';

export default function AuthButton(): JSX.Element {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { user, isLoading } = useAuth();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2">
        <div className="w-6 h-6 border-2 border-primary-100 border-t-transparent rounded-full animate-spin" />
        <span className="text-text-200 text-sm">Cargando...</span>
      </div>
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <>
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-text-200 hover:text-text-100 hover:bg-bg-200 transition-all duration-200 group"
      >
        <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Iniciar Sesión</span>
      </button>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
