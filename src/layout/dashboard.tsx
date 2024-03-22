import { Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import Left from "./dashboardLeft/left";
import Right from "./dashboardRight/right";
import { useHeaderPage } from "../hooks/useHeaderPage";
import KeyboardControls from "./keyboardControls";
import { MenuHijo } from "../interfaces/menu";
import MissingLogo from "../assets/images/missing.png";
import { HeaderContextProvider } from "../contexts/header";

interface Props {
  initialRoute: string;
  filterRoutes?: (page: MenuHijo) => boolean;
  subtitleOnPage?: Record<string, string>;
  asideIcons?: Record<string, JSX.Element>;
  header?: JSX.Element;
  logo?: string;
}

export const Dashboard = ({
  filterRoutes = () => true,
  subtitleOnPage = {},
  initialRoute,
  asideIcons = {},
  header,
  logo = MissingLogo,
}: Props) => {
  const [openNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  useHeaderPage();

  useEffect(() => {
    setOpen(openNav);
  }, [openNav]);

  return (
    <HeaderContextProvider>
      <KeyboardControls>
        <div className={styles.dashboard}>
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="z-40 fixed inset-0 bg-[rgba(0,0,0,0.3)] animate-[appear_.3s]"
            />
          )}
          <Left
            open={open}
            page={page}
            setPage={setPage}
            setOpen={setOpen}
            openNav={openNav}
            initialRoute={initialRoute}
            asideIcons={asideIcons}
            logo={logo}
          />
          <Right
            open={open}
            page={page}
            setOpen={setOpen}
            openNav={openNav}
            filterRoutes={filterRoutes}
            subtitleOnPage={subtitleOnPage}
          />
          {header}
          <main className={styles.main + " overflow-auto dark:bg-gray-800"}>
            <Outlet />
          </main>
        </div>
      </KeyboardControls>
    </HeaderContextProvider>
  );
};
