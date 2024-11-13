import { useAuth } from '@/contexts/AuthContext';
import { Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#432B4F] text-white">
      <div className="flex flex-row px-4 py-4">
        <div className="basis-1/3">
          <img src="/assets/logo.webp" alt="Logo" className="px-4" />
        </div>
        <div className="basis-1/3">
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold">Gestão de vagas</h1>
          </div>
        </div>
        {user && (
          <div className="basis-1/3">
            <div className="flex px-5 justify-end">
              <button
                type="button"
                className="p-2 hover:bg-[#533961] rounded-full"
              >
                <Bell className="w-5 h-5" />
              </button>
              <div className="px-2">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-[#432B4F] font-medium">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <span>{user?.name}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
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
    </header>
  );
};

export { Header };
