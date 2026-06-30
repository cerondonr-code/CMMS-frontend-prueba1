import React from 'react';
import { Clock, Wrench, CheckCircle, Play, Check } from 'lucide-react';

export default function KanbanBoard({ workOrders, moveOrderStatus }) {
  return (
    // CONTENEDOR PRINCIPAL DEL TABLERO
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 space-y-4 transition-colors duration-200">
      
      {/* CABECERA DEL TABLERO */}
      <div className="border-b border-gray-100 dark:border-slate-800 pb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Órdenes de Trabajo (Tablero Kanban)</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400">Control operativo en tiempo real de las tareas de mantenimiento.</p>
        </div>
        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md font-medium border border-transparent dark:border-slate-700/50">
          Total OTs: {workOrders.length}
        </span>
      </div>

      {/* REJILLA DE LAS TRES COLUMNAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* COLUMNA: PENDIENTES */}
        <div className="bg-red-50/60 dark:bg-red-950/10 p-3 rounded-lg border border-slate-200/60 dark:border-red-900/20 min-h-[250px] flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-red-900/20 pb-1.5">
            <span className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center">
              <Clock className="w-3.5 h-3.5 text-red-700 dark:text-red-400 mr-1.5" /> PENDIENTES
            </span>
            <span className="text-xs bg-red-200 dark:bg-red-900/40 text-slate-800 dark:text-red-300 px-2 py-0.5 rounded-full font-bold">
              {workOrders.filter(o => o.status === 'PENDIENTE').length}
            </span>
          </div>
          
          <div className="space-y-2.5 flex-1 overflow-y-auto">
            {workOrders.filter(o => o.status === 'PENDIENTE').map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 transition-all space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                    {order.id}
                  </span>
                  <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 px-1.5 py-0.5 rounded-full font-bold">
                    {order.priority}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 leading-snug">{order.title}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-400">
                  Asignado a: <span className="text-gray-600 dark:text-slate-300 font-medium">{order.assignedTo}</span>
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-slate-700 flex justify-end">
                  <button 
                    onClick={() => moveOrderStatus(order.id, 'PROGRESO')}
                    className="flex items-center text-[10px] bg-slate-900 dark:bg-slate-700 text-white px-2.5 py-1 rounded hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-colors"
                  >
                    <Play className="w-3 h-3 mr-1" /> Atender Orden
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA: EN PROGRESO */}
        <div className="bg-amber-50/60 dark:bg-amber-950/10 p-3 rounded-lg border border-slate-200/60 dark:border-amber-900/20 min-h-[250px] flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-amber-900/20 pb-1.5">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center">
              <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mr-1.5" /> EN PROGRESO
            </span>
            <span className="text-xs bg-amber-200 dark:bg-amber-900/40 text-slate-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
              {workOrders.filter(o => o.status === 'PROGRESO').length}
            </span>
          </div>
          
          <div className="space-y-2.5 flex-1 overflow-y-auto">
            {workOrders.filter(o => o.status === 'PROGRESO').map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                    {order.id}
                  </span>
                  <span className="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-bold">
                    {order.priority}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 leading-snug">{order.title}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-400">
                  Responsable: <span className="text-gray-600 dark:text-slate-300 font-medium">{order.assignedTo}</span>
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-slate-700 flex justify-end">
                  <button 
                    onClick={() => moveOrderStatus(order.id, 'COMPLETADO')}
                    className="flex items-center text-[10px] bg-emerald-600 text-white px-2.5 py-1 rounded hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
                  >
                    <Check className="w-3 h-3 mr-1" /> Cerrar OT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA: COMPLETADO */}
        <div className="bg-emerald-50/60 dark:bg-emerald-950/10 p-3 rounded-lg border border-slate-200/60 dark:border-emerald-900/20 min-h-[250px] flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-emerald-900/20 pb-1.5">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1.5" /> COMPLETADAS
            </span>
            <span className="text-xs bg-emerald-200 dark:bg-emerald-900/40 text-slate-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              {workOrders.filter(o => o.status === 'COMPLETADO').length}
            </span>
          </div>
          
          <div className="space-y-2.5 flex-1 overflow-y-auto">
            {workOrders.filter(o => o.status === 'COMPLETADO').map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 opacity-75 dark:opacity-60 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                    {order.id}
                  </span>
                  <span className="text-[9px] bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-full font-bold">
                    CERRADA
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400 line-through leading-snug">{order.title}</p>
                <div className="pt-1 flex items-center text-[9px] text-green-600 dark:text-green-400 font-medium">
                  <Check className="w-3 h-3 mr-1" /> Guardado en historial
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}