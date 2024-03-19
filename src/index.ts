import "./tailwind.css";

export { serverAPI as gatewayAPI } from "./config";

export { AuthGuard } from "./components/authGuard";
export { AuthContext } from "./contexts/user";

export { useUser } from "./hooks/useUser";
export { useAuth } from "./hooks/useAuth";

export type { LoginForm } from "./utils/login";
export type { RegisterForm } from "./utils/register";

export { PageContainer } from "./components/common/pageContainer/pageContainer";

export { TableContainer } from "./components/common/table/tableContainer";

export { useGet } from "./hooks/useGet";

export { createColumns } from "./utils/createColumns";

export { Users } from "./views/usuarios";
