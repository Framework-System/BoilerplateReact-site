import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-[#432B4F] text-white">
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <img src="/assets/Logo.webp" alt="Logo" className="px-4"/>
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-semibold">Gestão de vagas</h1>
        </div>
        <div className="flex items-center space-x-4 px-6">
          <button className="p-2 hover:bg-[#533961] rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
              <span className="text-[#432B4F] font-medium">A</span>
            </div>
            <span>Anna</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;