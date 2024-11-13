import { SidebarProvider } from '@/contexts/SidebarContext';

export function Provider(props: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      {props.children}
    </SidebarProvider>
  );
}
