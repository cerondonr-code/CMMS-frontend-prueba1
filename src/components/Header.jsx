import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ menuItems, activeTab }) {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <div>
      <header className="flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {menuItems.find((item) => item.id === activeTab)?.name}
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 transition-colors cursor-pointer"
            title={darkMode ? "Activar Modo Claro" : "Activar Modo Oscuro"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            LM
          </div>
        </div>
      </header>
    </div>
  );
}
