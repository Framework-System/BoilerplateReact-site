import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <main className="px-6 py-6">
      <h2 className="text-lg font-medium">Bem-vindo, {user?.name}!</h2>
    </main>
  );
};

export { Home };
