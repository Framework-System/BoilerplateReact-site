import React from 'react';
import { Home, Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  const menuItems: MenuItem[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5" /> },
    { 
      id: 'vagas', 
      label: 'Gestão de vagas', 
      icon: <Briefcase className="w-5 h-5" />,
      isActive: true 
    },
    { 
      id: 'entrevistas', 
      label: 'Cadastrar entrevistas', 
      icon: <Calendar className="w-5 h-5" /> 
    },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-22'
      }`}
    >
      <div className="p-4">
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.isActive
                      ? 'bg-[#432B4F] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {isExpanded && <span className="ml-3">{item.label}</span>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4">
      <button
          onClick={toggleSidebar}
          className="px-4 py-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </aside>
  );
};