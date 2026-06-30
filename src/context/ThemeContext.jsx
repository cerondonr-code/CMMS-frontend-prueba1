import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Inicializamos el contexto
const ThemeContext = createContext();

// 2. Creamos el proveedor global
export function ThemeProvider({ children }) {
  // Intentamos leer si el usuario ya tenía una preferencia guardada en el almacenamiento local
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Cada vez que cambie 'darkMode', actualizamos el HTML y el localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook para consumir el contexto de forma sencilla y directa
export function useTheme() {
  return useContext(ThemeContext);
}
