import React from "react";

export default function Header({ menuItems, activeTab }) {
  return (
    <div>
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          {menuItems.find((item) => item.id === activeTab)?.name}
        </h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            Líder de Mantenimiento
          </span>
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            LM
          </div>
        </div>
      </header>
    </div>
  );
}
