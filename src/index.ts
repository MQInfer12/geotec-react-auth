import "./tailwind.css";

export { serverAPI as gatewayAPI } from "./config";

export { AuthGuard } from "./components/authGuard";
export { AuthContext } from "./contexts/auth";
export { DashboardGuards as Dashboard } from "./layout/guards";

export { useUser } from "./hooks/useUser";
export { useAuth } from "./hooks/useAuth";
export { useHeaderContext as useHeader } from "./contexts/header";
export { useAuthRoutes } from "./hooks/useAuthRoutes";

export { Users } from "./views/usuarios";
export { Grupos } from "./views/grupos";

export type { LoginForm } from "./utils/login";
export type { RegisterForm } from "./utils/register";
export type { PasswordForm } from "./utils/password";
