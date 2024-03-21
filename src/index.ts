export { serverAPI as gatewayAPI } from "./config";

export { AuthGuard } from "./components/authGuard";
export { AuthContext } from "./contexts/auth";
export { AuthRoutes } from "./components/authRoutes";
export { Dashboard } from "./layout/dashboard";

export { useUser } from "./hooks/useUser";
export { useAuth } from "./hooks/useAuth";
export { useHeaderContext as useHeader } from "./contexts/header";

export type { LoginForm } from "./utils/login";
export type { RegisterForm } from "./utils/register";
export type { PasswordForm } from "./utils/password";
