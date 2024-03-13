import { useEffect } from "react";
import { useUser } from "../contexts/user";
import { Navigate } from "react-router-dom";

interface Props {
  redirectTo: string;
  loader: React.ReactNode;
  children: React.ReactNode;
}

export const AuthGuard = ({ loader, redirectTo, children }: Props) => {
  const { getUser, state } = useUser();

  useEffect(() => {
    if (state === "loading") {
      getUser();
    }
  }, []);

  if (state === "loading") return loader;
  if (state === "unlogged") return <Navigate to={redirectTo} />;
  return children;
};
