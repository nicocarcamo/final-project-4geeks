import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Perfil } from "./pages/perfil";
import { CrearEvento } from "./pages/crearevento";
import { UnirseEvento } from "./pages/unirseevento";
import { Inbox } from "./pages/inbox";
import { ProtectedRoutes } from "./pages/protectedroutes";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Register />} path="/register" />
                        {/* <Route element={<ProtectedRoutes />}> */}
                            <Route element={<Home />} path="/home" />
                            <Route element={<Perfil />} path="/perfil" />
                            <Route element={<CrearEvento />} path="/crearevento" />
                            <Route element={<UnirseEvento />} path="/unirseevento" />   
                            <Route element={<Inbox />} path="/inbox" />
                            <Route element={<Demo />} path="/register" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                        {/* </Route> */}
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

