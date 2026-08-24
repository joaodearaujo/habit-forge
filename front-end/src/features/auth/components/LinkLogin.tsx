import { Link } from "react-router-dom";

export function LinkLogin({children, to}: {children: React.ReactNode; to: string}) {
    return (
        <Link
          to={to}
            className="font-medium text-ink hover:underline cursor-pointer"
          >
            {children}
        </Link>
    )
}