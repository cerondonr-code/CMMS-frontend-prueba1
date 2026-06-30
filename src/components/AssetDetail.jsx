import React from 'react';
import { Cpu, Plus, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AssetDetail({ selectedAsset, createExpressOrder }) {
  // 1. MOVIDO AQUÍ: El hook siempre debe ir en la raíz del componente principal
  const { darkMode } = useTheme();

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'OPERATIVE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Operativo</span>;
      case 'MAINTENANCE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"><AlertTriangle className="w-3.5 h-3.5 mr-1" /> En Mantenimiento</span>;
      case 'CRITICAL':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"><XCircle className="w-3.5 h-3.5 mr-1" /> Fuera de Servicio</span>;
      default:
        return null;
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Adaptado a modo oscuro
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between h-auto lg:h-[380px] w-full transition-colors duration-200">
      {selectedAsset ? (
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* 1. CABECERA FIJA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-3 mb-4 gap-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-slate-100">{selectedAsset.name}</h3>
              <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 inline-block rounded border border-emerald-100 dark:border-emerald-900/50">
                TAG: {selectedAsset.id}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              {renderStatusBadge(selectedAsset.status)}
            </div>
          </div>

          {/* 2. ZONA DE SCROLL (Tarjetas de características) */}
          <div className="flex-1 overflow-y-auto pr-1 min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-800/50">
                <p className="text-gray-500 dark:text-slate-400 font-medium">Sistema Soportado</p>
                <p className="font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{selectedAsset.system}</p>
              </div>
              
              <div className="p-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-800/50">
                <p className="text-gray-500 dark:text-slate-400 font-medium">Fabricante / Marca</p>
                <p className="font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{selectedAsset.brand} ({selectedAsset.model})</p>
              </div>
              
              <div className="p-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-800/50">
                <p className="text-gray-500 dark:text-slate-400 font-medium">Número de Serie</p>
                <p className="font-mono text-gray-800 dark:text-slate-200 mt-0.5">{selectedAsset.serial}</p>
              </div>
              
              <div className="p-2.5 bg-gray-50 dark:bg-slate-800/60 rounded-lg border border-transparent dark:border-slate-800/50">
                <p className="text-gray-500 dark:text-slate-400 font-medium">Capacidad</p>
                <p className="font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{selectedAsset.capacity}</p>
              </div>
              
            </div>
          </div>

          {/* 3. PIE DE TARJETA FIJO */}
          <div className="border-t border-gray-100 dark:border-slate-800 pt-3 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-slate-900 shrink-0 transition-colors">
            <p className="text-[11px] text-gray-500 dark:text-slate-400">
              Último Mantenimiento: <span className="font-semibold text-gray-700 dark:text-slate-300">{selectedAsset.lastMaintenance}</span>
            </p>
            <button 
              onClick={createExpressOrder}
              className="flex items-center justify-center bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Crear OT Correctiva
            </button>
          </div>
          
        </div>
      ) : (
        /* ESTADO SIN SELECCIÓN */
        <div className="h-full flex flex-col items-center justify-center text-center p-6 py-12">
          <Cpu className="w-10 h-10 text-gray-300 dark:text-slate-700 mb-2" />
          <p className="text-gray-500 dark:text-slate-400 text-xs">Selecciona un equipo para ver detalles.</p>
        </div>
      )}
    </div>
  );
}