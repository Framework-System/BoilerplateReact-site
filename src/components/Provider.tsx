import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

export function Provider(props: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>{props.children}</SidebarProvider>
    </AuthProvider>
  );
}
