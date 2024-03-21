import { Route } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";

function getActions(object: any): string[] {
  let acciones = [];
  if ("accion" in object) {
    acciones.push(object.accion);
  }
  if ("hijos" in object && Array.isArray(object.hijos)) {
    for (const hijo of object.hijos) {
      acciones = acciones.concat(getActions(hijo));
    }
  }
  return acciones;
}

export const AuthRoutes = () => {
  const { routeComponents } = useAuthContext();
  const renderRoutes = () => {
    const { menus } = useAuthContext();
    if (!menus) return [];
    const ableToRender = getActions({ hijos: menus });
    return Object.keys(routeComponents).filter((route) => {
      return ableToRender.includes(route);
    });
  };
  return renderRoutes().map((routeKey) => (
    <Route
      key={routeKey}
      path={routeKey}
      element={routeComponents[routeKey].component}
    />
  ));
};
