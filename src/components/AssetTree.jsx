import React, { useState } from 'react';
import { Folder, Layers, Cpu, ChevronDown, ChevronRight } from 'lucide-react';

export default function AssetTree({ mockAssets, selectedAsset, setSelectedAsset }) {
  // Estado local para controlar qué sububicaciones (Sótano, Piso 1, etc.) están expandidas
  const [expandedSubLocs, setExpandedSubLocs] = useState({});

  // Función para alternar el estado de abierto/cerrado usando el id de la sububicación
  const toggleSubLoc = (id) => {
    setExpandedSubLocs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    // CONTENEDOR MAESTRO: Cambia a pizarra oscuro y adapta sus bordes
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col h-auto lg:h-[380px] transition-colors duration-200">
      
      <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3 border-b border-gray-100 dark:border-slate-800 pb-2">
        Infraestructura
      </h3>
      
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {mockAssets.map((zone) => (
          <div key={zone.id} className="space-y-2">
            
            {/* Nivel 1: Zona Común (Raíz) - Gris tenue en oscuro */}
            <div className="flex items-center text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-transparent dark:border-slate-800/30">
              <Folder className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2" />
              <span>{zone.name}</span>
            </div>
            
            {/* Contenedor de Sububicaciones (Línea guía vertical adaptada) */}
            <div className="pl-3 space-y-2 border-l border-gray-200 dark:border-slate-800 ml-2">
              {zone.children.map((subLoc) => {
                const isExpanded = !!expandedSubLocs[subLoc.id];

                return (
                  <div key={subLoc.id} className="space-y-1">
                    
                    {/* Nivel 2: Botón de Sububicación (Sótano, Piso 1, etc.) */}
                    <button
                      onClick={() => toggleSubLoc(subLoc.id)}
                      className="flex items-center w-full text-left text-[12px] font-semibold text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700/70 transition-colors cursor-pointer justify-between"
                    >
                      <div className="flex items-center">
                        <Layers className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400 mr-2" />
                        <span>{subLoc.name}</span>
                      </div>
                      {/* Flechas dinámicas */}
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400" />
                      )}
                    </button>
                    
                    {/* Nivel 3: Activos finales (Aparecen si está expandido) */}
                    {isExpanded && (
                      <div className="pl-3 space-y-1 border-l border-gray-200 dark:border-slate-800 ml-2 transition-all">
                        {subLoc.children.map((equipment) => {
                          const isSelected = selectedAsset?.id === equipment.id;
                          
                          return (
                            <button
                              key={equipment.id}
                              onClick={() => setSelectedAsset(equipment)}
                              className={`flex items-center w-full text-left px-2.5 py-2 text-xs rounded transition-all ${
                                isSelected 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-medium shadow-sm' 
                                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                              }`}
                            >
                              <Cpu className={`w-3.5 h-3.5 mr-2 shrink-0 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'}`} />
                              <span className="truncate">{equipment.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                  </div>
                );
              })}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}