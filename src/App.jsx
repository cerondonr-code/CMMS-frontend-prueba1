import React, { useState } from "react";
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

// DATOS MOCK DE ALTO NIVEL
const mockAssets = [
  {
    id: "BG-ZCOM",
    name: "Zona Común",
    type: "LOCATION",
    children: [
      {
        id: "BG-ZCOM-S1",
        name: "Sótano - Cuartos Técnicos",
        children: [
          {
            id: "BG-ZCOM-S-CLAC-CHLR-01",
            name: "Extractores Azul 2 - Sistema de Ventilación",
            status: "OPERATIVE",
            system: "Climatización",
            brand: "Carrier",
            model: "30XW1012",
            serial: "SN-984321",
            capacity: "150 TR",
            lastMaintenance: "2026-05-15",
          },
          {
            id: "BG-ZCOM-S-HBR-BMB-01",
            name: "Bomba de Agua Potable",
            status: "MAINTENANCE",
            system: "Red Hidráulica",
            brand: "Grundfos",
            model: "C32",
            serial: "SN-44321",
            capacity: "15 HP",
            lastMaintenance: "2026-06-20",
          },
          {
            id: "BG-ZCOM-S-ELEC-SUB-01",
            name: "Subestación Eléctrica 1",
            status: "OPERATIVE",
            system: "Red Eléctrica",
            brand: "Siemens",
            model: "Sion 3AE",
            serial: "SN-ELEC-7732",
            capacity: "500 kVA",
            lastMaintenance: "2026-02-10",
          },
          {
            id: "BG-ZCOM-S-ELEC-SUB-02",
            name: "Subestación Eléctrica 2",
            status: "CRITICAL",
            system: "Red Eléctrica",
            brand: "Siemens",
            model: "Sion 3AE",
            serial: "SN-ELEC-7733",
            capacity: "800 kVA",
            lastMaintenance: "2026-02-10",
          },
        ],
      },
      {
        id: "BG-ZCOM-P1",
        name: "Piso 1 - Baterías Sanitarias",
        children: [
          {
            id: "BG-ZCOM-P1-HID-BAT-11",
            name: "Batería Sanitaria 11",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
          {
            id: "BG-ZCOM-P1-HID-BAT-12",
            name: "Batería Sanitaria 12",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
          {
            id: "BG-ZCOM-P1-HID-BAT-13",
            name: "Batería Sanitaria 13",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
        ],
      },
      {
        id: "BG-ZCOM-P2",
        name: "Piso 2 - Baterías Sanitarias",
        children: [
          {
            id: "BG-ZCOM-P2-HID-BAT-21",
            name: "Batería Sanitaria 21",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
          {
            id: "BG-ZCOM-P2-HID-BAT-22",
            name: "Batería Sanitaria 22",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
          {
            id: "BG-ZCOM-P2-HID-BAT-23",
            name: "Batería Sanitaria 23",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
        ],
      },
      {
        id: "BG-ZCOM-P3",
        name: "Piso 3 - Baterías Sanitarias",
        children: [
          {
            id: "BG-ZCOM-P3-HID-BAT-31",
            name: "Batería Sanitaria 31",
            status: "OPERATIVE",
            system: "Red Hidrosanitaria",
            brand: "NA",
            model: "NA",
            serial: "NA",
            capacity: "--",
            lastMaintenance: "2026-06-28",
          },
        ],
      },
    ],
  },
];

const initialMockOrders = [
  {
    id: "OT-2026-001",
    assetId: "BG-ZCOM-P1-ELEC-SUB-01",
    title: "Mantenimiento Correctivo por Calentamiento",
    priority: "ALTA",
    status: "PENDIENTE",
    assignedTo: "Técnico Eléctricista",
  },
  {
    id: "OT-2026-002",
    assetId: "BG-ZCOM-S1-HBR-BMB-01",
    title: "Cambio de sellos mecánicos",
    priority: "MEDIA",
    status: "PROGRESO",
    assignedTo: "Técnico Hidráulico",
  },
];

export default function App() {
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
    //{ id: "otro", name: "Otro", icon: Menu },  handshake
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
    <div className="flex h-screen bg-gray-100 font-sans antialiased text-gray-900">
      <Sidebar
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header menuItems={menuItems} activeTab={activeTab} />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
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

          {activeTab !== "pilar1" && (
            <div className="bg-white p-12 rounded-xl text-center border">
              <p className="text-gray-500">Módulo en desarrollo.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
