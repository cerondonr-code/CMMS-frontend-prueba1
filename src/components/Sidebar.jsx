import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ menuItems, activeTab, setActiveTab, isOpen, setIsOpen }) {
  return (
    <aside 
      className={`hidden md:flex flex-col bg-slate-900 text-white border-r border-slate-800 transition-all duration-400 relative ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Botón flotante para contraer/expandir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-full shadow-md cursor-pointer transition-colors z-50 flex items-center justify-center"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Contenedor del Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-center min-h-[90px]">
        {isOpen ? (
          <img
            src="https://espacios-comerciales.centromayor.com.co/sites/default/files/default-disponible.png"
            className="w-40 mx-auto mt-0 transition-all duration-300"
            alt="Centro Mayor Logo"
          />
        ) : (
          /* Versión minificada del logo cuando el Sidebar se esconde */
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-slate-700 shadow-sm shrink-0">
            <img
              src="https://espacios-comerciales.centromayor.com.co/sites/default/files/default-disponible.png"
              className="w-16 max-w-none object-contain"
              alt="Mini Logo"
            />
          </div>
        )}
      </div>

      {/* Navegación de Módulos */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full rounded-lg text-sm font-sm transition-all duration-200 ${
                isOpen ? "px-4 py-3" : "p-3 justify-center"
              } ${
                activeTab === item.id
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              title={!isOpen ? item.name : undefined} // Muestra tooltip nativo al poner el mouse encima si está cerrado
            >
              <Icon className={`w-5 h-5 shrink-0 ${isOpen ? "mr-3" : ""}`} />
              
              {/* Solo renderiza el texto si la barra está abierta */}
              {isOpen && <span className="truncate">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Pie de página con versión del sistema */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center whitespace-nowrap overflow-hidden">
        {isOpen ? (
          <>
            <p className="text-xs text-center text-slate-400 mt-1 p-2">
              CMMS - Mantenimiento
            </p>
            Versión 1.0.0 — Entorno Local
          </>
        ) : (
          <span className="font-semibold text-slate-400">v1.0</span>
        )}
      </div>
    </aside>
  );
}
