import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Bell, KeyRound, LogOut, Menu, User } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordModal } from '@/components/users/ChangePasswordModal';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Gestão de vagas' }) => {
  const { toggleSidebar } = useSidebar();
  const { user, logout, checkTokenExpiration } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    checkTokenExpiration();
  }, [checkTokenExpiration]);

  return (
    <header className="bg-white text-[#432B4F] fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-row px-4 py-4 items-center">
        <div className="basis-1/3 flex items-center">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <img
            src="/assets/icon-frw.ico"
            alt="Logo"
            className="h-8 px-1 ml-2"
          />
        </div>
        <div className="basis-1/3">
          <div className="flex justify-center">
            <h1 className="custom-title hidden md:block">{title}</h1>
          </div>
        </div>
        {user && (
          <div className="basis-1/3 flex justify-end items-center space-x-4">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full">
              <User
                className="w-5 h-5 text-[#432B4F]"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <div className="relative inline-block" ref={menuRef}>
                <span
                  className="hidden lg:inline text-[#432B4F] font-medium"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onKeyUp={(e) =>
                    e.key === 'Enter' && setShowDropdown(!showDropdown)
                  }
                >
                  {user.name.split(' ').length > 1
                    ? user.name.split(' ')[0]
                    : user.name}
                </span>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      type="button"
                      onClick={() => setIsChangePasswordModalOpen(true)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <KeyRound className="w-4 h-4 mr-2" />
                      Trocar senha
                    </button>
                    <hr />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </header>
  );
};

export { Header };
