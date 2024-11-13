import { useSidebar } from '@/contexts/SidebarContext';
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const Sidebar = () => {
  const { isExpanded, toggleSidebar, currentPath } = useSidebar();

  const menuItems: Array<MenuItem> = [
    {
      id: 'inicio',
      label: 'Início',
      icon: <Home className="w-5 h-5" />,
      path: '/',
    },
    {
      id: 'vagas',
      label: 'Gestão de vagas',
      icon: <Briefcase className="w-5 h-5" />,
      path: '/jobs',
    },
    {
      id: 'entrevistas',
      label: 'Cadastrar entrevistas',
      icon: <Calendar className="w-5 h-5" />,
      path: '/interviews',
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
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-[#432B4F] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {isExpanded && <span className="ml-3">{item.label}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4">
        <button
          type="button"
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
