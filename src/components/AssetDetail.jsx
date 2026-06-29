import React from 'react';
import { Cpu, Plus, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function AssetDetail({ selectedAsset, createExpressOrder }) {
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'OPERATIVE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Operativo</span>;
      case 'MAINTENANCE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertTriangle className="w-3.5 h-3.5 mr-1" /> En Mantenimiento</span>;
      case 'CRITICAL':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3.5 h-3.5 mr-1" /> Fuera de Servicio</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-[380px]">
      {selectedAsset ? (
        <>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedAsset.name}</h3>
                <p className="text-[11px] font-mono text-emerald-600 mt-1 bg-emerald-50 px-2 py-0.5 inline-block rounded border border-emerald-100">
                  TAG: {selectedAsset.id}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                {renderStatusBadge(selectedAsset.status)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-medium">Sistema Soportado</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedAsset.system}</p>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-medium">Fabricante / Marca</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedAsset.brand} ({selectedAsset.model})</p>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-medium">Número de Serie</p>
                <p className="font-mono text-gray-800 mt-0.5">{selectedAsset.serial}</p>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-medium">Capacidad de Diseño</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedAsset.capacity}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-3 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] text-gray-500">Último Mantenimiento: <span className="font-semibold text-gray-700">{selectedAsset.lastMaintenance}</span></p>
            <button 
              onClick={createExpressOrder}
              className="flex items-center justify-center bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Crear OT Correctiva
            </button>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <Cpu className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-gray-500 text-xs">Selecciona un equipo para ver detalles.</p>
        </div>
      )}
    </div>
  );
}