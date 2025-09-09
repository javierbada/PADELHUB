'use client';

import { useState } from 'react';
import { X, CreditCard, Shield, CheckCircle, Star, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOfertas } from '@/contexts/OfertasContext';

interface SuscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuscripcionModal({ isOpen, onClose }: SuscripcionModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Registro, 2: Pago

  const { login, register } = useAuth();
  const { registrarPersona } = useOfertas();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (currentStep === 1) {
        // Paso 1: Registro/Login
        if (isLogin) {
          const success = await login(formData.email, formData.password);
          if (success) {
            setCurrentStep(2);
          } else {
            setError('Credenciales incorrectas. Usa demo@padelhub.com / demo123');
          }
        } else {
          if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsSubmitting(false);
            return;
          }
          const success = await register(formData.name, formData.email, formData.password);
          if (success) {
            setCurrentStep(2);
          } else {
            setError('Error al crear la cuenta');
          }
        }
      } else {
        // Paso 2: Procesar pago
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simular pago
        registrarPersona();
        onClose();
        setFormData({ name: '', email: '', password: '', confirmPassword: '', cardNumber: '', expiryDate: '', cvv: '', cardName: '' });
        setCurrentStep(1);
      }
    } catch (err) {
      setError('Error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-8 relative modal-in shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-bg-300 transition-colors"
          >
            <X className="w-5 h-5 text-text-200" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-100 mb-2">
              {currentStep === 1 ? 'Accede a tu cuenta' : 'Completa tu suscripción'}
            </h2>
            <p className="text-text-200">
              {currentStep === 1 
                ? 'Inicia sesión o regístrate para obtener el 35% de descuento' 
                : 'Procesa el pago para activar tu suscripción premium'
              }
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-200">Paso {currentStep} de 2</span>
              <span className="text-sm text-primary-100 font-medium">{currentStep === 1 ? 'Registro' : 'Pago'}</span>
            </div>
            <div className="w-full bg-bg-300 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-full h-2 transition-all duration-500"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              // Paso 1: Registro/Login
              <>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-100 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-200 hover:text-text-100 transition-colors"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      Confirmar contraseña
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                )}
              </>
            ) : (
              // Paso 2: Información de pago
              <>
                <div className="bg-gradient-to-r from-accent-100/10 to-primary-100/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-accent-100" />
                    <div>
                      <h3 className="font-bold text-text-100">Suscripción Premium</h3>
                      <p className="text-text-200 text-sm">Acceso completo a todas las funciones</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-text-100">€9.99</div>
                      <div className="text-sm text-text-200 line-through">€15.99</div>
                      <div className="text-xs text-green-400 font-medium">35% descuento</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="MM/AA"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-100 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-300 border border-bg-300 rounded-lg text-text-100 placeholder-text-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-text-200">
                  <Shield className="w-4 h-4" />
                  <span>Pago seguro procesado por Stripe</span>
                </div>
              </>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-100 to-accent-100 text-white py-3 rounded-lg font-semibold hover:from-primary-200 hover:to-accent-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  {currentStep === 1 ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pagar €9.99</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          {currentStep === 1 && (
            <div className="mt-6 text-center">
              <p className="text-text-200 text-sm">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-primary-100 hover:text-primary-200 font-medium transition-colors"
                >
                  {isLogin ? 'Regístrate' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          )}

          {/* Demo credentials */}
          {currentStep === 1 && isLogin && (
            <div className="mt-4 p-3 bg-bg-300 rounded-lg">
              <p className="text-text-200 text-xs text-center">
                <strong>Demo:</strong> demo@padelhub.com / demo123
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
