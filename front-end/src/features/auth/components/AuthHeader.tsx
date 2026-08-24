import { ThemeButton } from '@/components/ui/Buttons/ThemeButton';
import { LinkLogin } from './LinkLogin';

type AuthHeaderProps = {
  title: string;
  actionLabel: 'logging in' | 'registering';
};

export function AuthHeader({ title, actionLabel }: AuthHeaderProps) {
  return (
    <section className="flex justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium text-left text-ink">{title}</h1>
        <p className="text-sm text-left text-ink">
          By {actionLabel}, you agree to our{' '}
          <LinkLogin to="#">Terms of Service</LinkLogin>
        </p>
      </div>
      <ThemeButton />
    </section>
  );
}