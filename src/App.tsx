import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { Header } from '@/layout/components/Header';
import { Meta } from '@/layout/components/Meta';
import { Sidebar } from '@/layout/components/Sidebar';
import { Routings } from '@/router/routings';
import { useLocation } from 'react-router-dom';

const noSidebarRoutes = ['/login'];
const noHeaderRoutes = ['/login'];

const App = () => {
  const location = useLocation();

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <SidebarProvider>
        <Meta />
        <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
          {shouldShowHeader && <Header />}
          <div className="flex flex-1">
            {shouldShowSidebar && <Sidebar />}
            <div className="flex-1 p-4">
              <Routings />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export { App };
