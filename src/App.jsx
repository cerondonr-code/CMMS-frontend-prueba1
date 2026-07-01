import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  ShieldAlert,
  BarChart3,
  Settings,
  Menu,
  X,
  UsersRound,
  Droplet,
  Droplets,
  Handshake,
  Hand,
} from "lucide-react";

// Importamos nuestros componentes modulares limpios
import Sidebar from "./components/Sidebar";
import AssetTree from "./components/AssetTree";
import AssetDetail from "./components/AssetDetail";
import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext"; // <--- 1. IMPORTAMOS EL HOOK DEL TEMA
import { initialMockOrders } from "./utils/mockOrders"; // <--- 2. IMPORTAMOS LOS DATOS MOCK DE OTs
import { mockAssets } from "./utils/mockAssets"; // <--- 3. IMPORTAMOS LOS DATOS MOCK DE ACTIVOS


export default function App() {
  const { darkMode } = useTheme(); // <--- 2. CONSUMIMOS EL CONTEXTO EN APP
  const [activeTab, setActiveTab] = useState("pilar1");
  const [selectedAsset, setSelectedAsset] = useState(
    mockAssets[0].children[1].children[0],
  );
  const [workOrders, setWorkOrders] = useState(initialMockOrders);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", name: "Panel General", icon: LayoutDashboard },
    { id: "pilar1", name: "Activos y OTs", icon: Wrench },
    { id: "pilar2", name: "Operación", icon: ShieldAlert },
    { id: "pilar3", name: "Indicadores e Informes", icon: BarChart3 },
    { id: "recurso-humano", name: "Personal", icon: UsersRound },
    { id: "serv-public", name: "Servicios Públicos", icon: Droplets },
    { id: "solicitudes", name: "Solicitudes", icon: Hand },
    { id: "config", name: "Configuración", icon: Settings },
  ];

  const moveOrderStatus = (orderId, newStatus) => {
    setWorkOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const createExpressOrder = () => {
    if (!selectedAsset) return;
    const newOrder = {
      id: `OT-2026-00${workOrders.length + 1}`,
      assetId: selectedAsset.id,
      title: `Revisión urgente para: ${selectedAsset.name}`,
      priority: "ALTA",
      status: "PENDIENTE",
      assignedTo: "Técnico de Turno",
    };
    setWorkOrders([newOrder, ...workOrders]);
  };

  return (
    // 3. CAMBIO AQUÍ: Añadimos dark:bg-slate-950 y dark:text-slate-100 al contenedor base
    <div className="flex h-screen bg-gray-100 dark:bg-slate-950 font-sans antialiased text-gray-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header menuItems={menuItems} activeTab={activeTab} />

        {/* 4. CAMBIO AQUÍ: Añadimos dark:bg-slate-900 para el fondo del panel de contenido */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-150 dark:bg-slate-1000 space-y-4 transition-colors duration-200">
          {activeTab === "pilar1" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                <AssetTree
                  mockAssets={mockAssets}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                />
                <div className="lg:col-span-2">
                  <AssetDetail
                    selectedAsset={selectedAsset}
                    createExpressOrder={createExpressOrder}
                  />
                </div>
              </div>
              <KanbanBoard
                workOrders={workOrders}
                moveOrderStatus={moveOrderStatus}
              />
            </>
          )}

          {/* 5. CAMBIO AQUÍ: Añadimos dark:bg-slate-800 y dark:border-slate-700 al módulo vacío */}
          {activeTab !== "pilar1" && (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-xl text-center border border-gray-200 dark:border-slate-700 transition-colors">
              <p className="text-gray-500 dark:text-slate-400">
                Módulo en desarrollo.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
