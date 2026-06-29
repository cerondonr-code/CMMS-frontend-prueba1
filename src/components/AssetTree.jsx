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
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[380px]">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">Infraestructura</h3>
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {mockAssets.map((zone) => (
          <div key={zone.id} className="space-y-2">
            {/* Nivel 1: Zona Común (Raíz) */}
            <div className="flex items-center text-xs font-bold text-slate-700 bg-slate-50 p-2 rounded">
              <Folder className="w-4 h-4 text-slate-500 mr-2" />
              <span>{zone.name}</span>
            </div>
            
            {/* Contenedor de Sububicaciones */}
            <div className="pl-3 space-y-2 border-l border-gray-200 ml-2">
              {zone.children.map((subLoc) => {
                const isExpanded = !!expandedSubLocs[subLoc.id];

                return (
                  <div key={subLoc.id} className="space-y-1">
                    {/* Nivel 2: Sububicación (Sótano, Piso 1) ahora interactivo */}
                    <button
                      onClick={() => toggleSubLoc(subLoc.id)}
                      className="flex items-center w-full text-left text-[12px] font-semibold text-gray-600 bg-gray-100 p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer justify-between"
                    >
                      <div className="flex items-center">
                        <Layers className="w-3.5 h-3.5 text-gray-500 mr-2" />
                        <span>{subLoc.name}</span>
                      </div>
                      {/* Flecha dinámica según el estado */}
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </button>
                    
                    {/* Nivel 3: Activos finales (Solo se renderizan si isExpanded es true) */}
                    {isExpanded && (
                      <div className="pl-3 space-y-1 border-l border-gray-200 ml-2 transition-all">
                        {subLoc.children.map((equipment) => (
                          <button
                            key={equipment.id}
                            onClick={() => setSelectedAsset(equipment)}
                            className={`flex items-center w-full text-left px-2.5 py-2 text-xs rounded transition-all ${
                              selectedAsset?.id === equipment.id 
                                ? 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 font-medium shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Cpu className={`w-3.5 h-3.5 mr-2 shrink-0 ${selectedAsset?.id === equipment.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                            <span className="truncate">{equipment.name}</span>
                          </button>
                        ))}
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