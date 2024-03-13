import { useEffect } from "react";
import { useAuthContext } from "../contexts/user";
import { Navigate } from "react-router-dom";
import { useUser } from "..";

interface Props {
  redirectTo: string;
  loader: React.ReactNode;
  children: React.ReactNode;
}

export const AuthGuard = ({ loader, redirectTo, children }: Props) => {
  const { state } = useAuthContext();
  const { getUser } = useUser();

  useEffect(() => {
    if (state === "loading") {
      getUser();
    }
  }, []);

  if (state === "loading") return loader;
  if (state === "unlogged") return <Navigate to={redirectTo} />;
  return children;
};
