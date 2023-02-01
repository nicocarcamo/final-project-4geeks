import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Perfil } from "./pages/perfil";
import { CrearEvento } from "./pages/crearevento";
import { UnirseEvento } from "./pages/unirseevento";
import { EventoDetalle } from "./pages/eventid";
import { BuscarUsuarios } from "./pages/buscarusuario";
import { PerfilId } from "./pages/perfilid";
import { MiEvento } from "./pages/mievento";
import { Inbox } from "./pages/inbox";
import { ProtectedRoutes } from "./pages/protectedroutes";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>

                <Route path="/" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/crearevento" element={<CrearEvento />} />
                <Route path="/unirseevento" element={<UnirseEvento />} />
                <Route path="/crearevento/:id" element={<EventoDetalle />} /> 
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/mievento" element={<MiEvento />} />
                <Route path="/perfil/:id" element={<PerfilId />} />
                <Route path="/perfil/all" element={<BuscarUsuarios />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/single/:theid" element={<Single />} />
                <Route path="*" element={<h1>Not found!</h1>} />
            </Route>
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
