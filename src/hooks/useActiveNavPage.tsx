import { useLocation } from "react-router-dom";
import { MenuHijo, MenuPadre } from "../interfaces/menu";
import { useUser } from "./useUser";

type Return =
  | {
      activeLink: MenuHijo;
      activePage: MenuPadre;
    }
  | {
      activeLink: undefined;
      activePage: undefined;
    };

const initialReturn: Return = {
  activeLink: undefined,
  activePage: undefined,
};

export const useActiveNavPage = (): Return => {
  const { pathname } = useLocation();
  const { menus: asideData } = useUser();

  const getActiveLinkRecursive = (
    hijos: MenuHijo[],
    page: MenuPadre
  ): Return => {
    for (const link of hijos) {
      if (link.accion?.startsWith(pathname)) {
        return {
          activePage: page,
          activeLink: link,
        };
      }

      let found: Return = initialReturn;
      if (link.hijos.length > 0) {
        found = getActiveLinkRecursive(link.hijos, page);
        if (found.activePage && found.activeLink) {
          return found;
        }
      }
    }
    return initialReturn;
  };

  let actives: Return = initialReturn;
  if (asideData) {
    for (const page of asideData) {
      actives = getActiveLinkRecursive(page.hijos, page);
      if (actives.activeLink) break;
    }
  }

  return actives;
};
