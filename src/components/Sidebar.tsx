import React from 'react';
import { ChevronDown, ChevronRight, FileText, Users, FileBarChart, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  selectedItem: string;
  onItemSelect: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onItemSelect }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['fiscalizacion-posterior']);

  const toggleExpand = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const menuItems = [
    {
      id: 'sigafip',
      label: 'SIGAFIP',
      icon: <FileText className="h-5 w-5" />,
      children: []
    },
    {
      id: 'fiscalizacion-posterior',
      label: 'Fiscalización Posterior',
      icon: <FileBarChart className="h-5 w-5" />,
      children: [
        { id: 'bandeja-ingresantes', label: 'Bandeja de Ingresantes' },
        { id: 'bandeja-legajos', label: 'Bandeja de Legajos por Fiscalizar' },
        { id: 'bandeja-documentos', label: 'Bandeja de Documentos por Fiscalizar' }
      ]
    },
    {
      id: 'consultas',
      label: 'Consultas',
      icon: <Users className="h-5 w-5" />,
      children: [
        { id: 'documento-notificado', label: 'Documentos Notificados' },
        { id: 'documento-observado', label: 'Documentos Observados' },
        { id: 'fiscalizacion-legajos', label: 'Fiscalización Legajos' }
      ]
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      children: []
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-2">
            <div
              className={`flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-50 ${
                selectedItem === item.id ? 'bg-blue-50 text-blue-600' : 'text-black'
              }`}
              onClick={() => {
                if (item.children.length > 0) {
                  toggleExpand(item.id);
                } else {
                  onItemSelect(item.id);
                }
              }}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.children.length > 0 && (
                expandedItems.includes(item.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </div>

            {item.children.length > 0 && expandedItems.includes(item.id) && (
              <div className="ml-8 mt-2 space-y-1">
                {item.children.map((child) => (
                  <div
                    key={child.id}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-50 ${
                      selectedItem === child.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => onItemSelect(child.id)}
                  >
                    <span className="text-sm">{child.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
