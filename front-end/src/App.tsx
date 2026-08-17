import '@/index.css';
import { CategoriesLegend } from '@/components/ui/CategoriesLegend';
import { Header } from './components/Header';
import { LoginForm } from './features/auth/components/LoginForm';
import { RoutineNav } from './features/routine/components/RoutineNav';
import { RoutineRouter } from './features/routine/components/RoutineRouter';
import { useAuth } from './context/AuthContext';
import { LogoutButton } from './components/ui/Buttons/LogoutButton';

function App() {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 w-full min-h-0 flex flex-col gap-4">
        <Header />
        <RoutineNav />
        <RoutineRouter />
      </div>
      <div className="w-full flex gap-4">
        <CategoriesLegend />
        <LogoutButton />
      </div>
    </>
  );
}

export default App;
