import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import logo from '../images/Logo3.png';
import '../css/App.css';
import UserAdd from "../views/Usuarios/CrearUsuario";
import GetUser from "../views/Usuarios/MostrarUsuario";
import UserCRUD from "../views/Usuarios/UserCRUD";
import Login from '../views/Usuarios/login';
import ProtectedRoute from "../views/protectedRoute";
import Header from "../views/header";
function App() {
  return (
    <>
    <Router> 
      <div className="App">
      <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={
              <>
                <Header /> {/* Solo se muestra si el usuario está autenticado */}
                <Routes>
                  <Route path="user/create" element={<UserAdd />} />
                  <Route path="user/mostrar" element={<GetUser />} />
                  <Route path="user" element={<UserCRUD />} />
                </Routes>
              </>
            } />
          </Route>

        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
