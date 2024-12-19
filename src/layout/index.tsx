import { useSidebar } from '@/contexts/SidebarContext';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Meta } from './components/Meta';
import { Sidebar } from './components/Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const noSidebarRoutes = ['/login'];
const noHeaderRoutes = ['/login'];

export const Layout = ({ children }: LayoutProps) => {
  const { setCurrentPath } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      <Meta />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {shouldShowHeader && <Header />}
        <div className="flex flex-1">
          {shouldShowSidebar && <Sidebar />}
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    </>
  );
};
