import { LogOut } from 'lucide-react';
import { DefaultButton } from './DefaultButton';
import { useAuth } from '@/context/AuthContext';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <DefaultButton
      onClick={logout}
      Icon={LogOut}
      label="Logout"
      classNameIcon="group-hover:text-red-400 "
    />
  );
}
