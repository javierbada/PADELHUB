'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TODO: Conectar con API para obtener fechas con partidos disponibles
// FIXME: Implementar lógica de cambio de fecha y filtrado de partidos

const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

interface DayData {
  label: string;
  date: string;
  isToday?: boolean;
}

export default function DaySelector() {
  const [selectedDay, setSelectedDay] = useState('HOY');
  
  // FIXME: Reemplazar con datos reales de la API
  const mockDays: DayData[] = [
    { label: 'DOM', date: '31/08' },
    { label: 'AYER', date: '01/09' },
    { label: 'HOY', date: '02/09', isToday: true },
    { label: 'MAÑANA', date: '03/09' },
    { label: 'JUE', date: '04/09' },
    { label: 'VIE', date: '05/09' },
    { label: 'SÁB', date: '06/09' },
  ];

  return (
    <div className="bg-bg-200 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <button className="p-2 rounded-lg hover:bg-bg-300 transition-colors">
          <ChevronLeft className="w-5 h-5 text-text-200" />
        </button>
        
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {mockDays.map((day) => (
            <button
              key={day.label}
              onClick={() => setSelectedDay(day.label)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                selectedDay === day.label || day.isToday
                  ? 'bg-primary-100 text-white shadow-lg'
                  : 'text-text-200 hover:text-text-100 hover:bg-bg-300'
              }`}
            >
              <div className="text-center">
                <div>{day.label}</div>
                {day.date && (
                  <div className="text-xs opacity-75 mt-1">{day.date}</div>
                )}
              </div>
            </button>
          ))}
        </div>

        <button className="p-2 rounded-lg hover:bg-bg-300 transition-colors">
          <ChevronRight className="w-5 h-5 text-text-200" />
        </button>
      </div>
    </div>
  );
}