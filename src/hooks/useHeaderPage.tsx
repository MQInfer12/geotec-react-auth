import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useHeaderContext } from "../contexts/header";
import { useAuthContext } from "../contexts/auth";

export const useHeaderPage = () => {
  const { routeComponents } = useAuthContext();
  const { setWindows } = useHeaderContext();
  const { pathname } = useLocation();

  useEffect(() => {
    const Page = routeComponents[pathname];
    if (Page) {
      setWindows((state) => {
        const exist = state.some((v) => v.name === Page.name);
        if (!exist) {
          return [...state, { name: Page.name, route: pathname }];
        }
        return state;
      });
    }
  }, [pathname]);
};
