import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContext } from ".";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./test";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <AuthContext logoutRoute={"/"} projectCluster="ERP" version="v1">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </React.StrictMode>
    {/*   <Usuario /> */}
  </>
);
