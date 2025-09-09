'use client';

import { useState } from 'react';
import { User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* User button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-bg-200 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-100">{user.name}</div>
          <div className="text-xs text-text-200">{user.email}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-200 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl p-2 shadow-xl border border-bg-300 animate-fade-in">
          {/* User info */}
          <div className="px-4 py-3 border-b border-bg-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-text-100">{user.name}</div>
                <div className="text-sm text-text-200">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-text-200 hover:text-text-100 hover:bg-bg-300 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-text-200 hover:text-text-100 hover:bg-bg-300 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </button>
            
            <div className="border-t border-bg-300 my-2" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
