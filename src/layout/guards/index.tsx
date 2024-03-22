import { HeaderContextProvider } from "../../contexts/header";
import { ThemeProvider } from "../../contexts/mode";
import { MenuHijo } from "../../interfaces/menu";
import { Dashboard } from "../dashboard";

interface Props {
  initialRoute: string;
  filterRoutes?: (page: MenuHijo) => boolean;
  subtitleOnPage?: Record<string, string>;
  asideIcons?: Record<string, JSX.Element>;
  header?: JSX.Element;
  logo?: string;
}

export const DashboardGuards = (props: Props) => {
  return (
    <ThemeProvider>
      <HeaderContextProvider>
        <Dashboard {...props} />
      </HeaderContextProvider>
    </ThemeProvider>
  );
};
