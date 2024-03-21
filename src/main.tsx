import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContext } from ".";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* import Test from "./views/test"; */
import { Users } from "./views/usuarios";
/*  import {Grupos } from "./views/grupos";  */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <AuthContext logoutRoute={"/"} projectCluster="ERP" version="v1">
        <BrowserRouter>
          <Routes>
            <Route
              path=""
              element={
                <Users
                  alertError={alert}
                  alertSuccess={alert}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </React.StrictMode>
  </>
);
