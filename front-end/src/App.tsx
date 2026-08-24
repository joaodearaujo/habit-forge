// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './features/auth/components/LoginForm';
import { RoutineNav } from './features/routine/routine/components/RoutineNav';
import { RoutineDisplay } from './features/routine/routine/components/RoutineDisplay';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { RegisterForm } from './features/auth/components/RegisterForm';
import { CategoriesLegend } from './components/ui/CategoriesLegend';
import { LogoutButton } from './components/ui/Buttons/LogoutButton';

export default function App() {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) return null;

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
      />      
      
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm />}
      />
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <>
              <Header />
              <RoutineNav />
              <RoutineDisplay />
              <div className='flex gap-2'>
                <CategoriesLegend />
                <LogoutButton />
              </div>
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}