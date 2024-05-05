// App.js
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Tools from './pages/MyTools';
import PublishTool from './pages/PublishTool';
import ToolDetails from './pages/ToolDetails';
import EditTool from './pages/EditTool';
import EditUser from './pages/EditUser';
import BuscarHerramienta from './pages/BuscarHerramienta';

import './App.css';
import { getAuthToken, request, setAuthHeader } from './helpers/axios_helper';
import Footer from './pages/Footer';
import MisReservas from './pages/MisReservas';
import EditarReserva from './pages/EditarReserva';

function App() {

  const [userNotFound, setUserNotFound] = useState(null);

  const logout = () => {
    setAuthHeader(null);
    sessionStorage.clear();
    window.location.href = "/";
  };

  const onLogin = async (e, formData) => {
    e.preventDefault();
    request("POST", "/login", formData).then(
      (response) => {
        setAuthHeader(response.data.token);
        sessionStorage.setItem("userId", response.data.id);
        sessionStorage.setItem("username", response.data.username);
        setUserNotFound(null);
        window.location.href = "/";
        if (response.data.token !== null) {
        } else {
          setAuthHeader(null);
          setUserNotFound("Usuario no encontrado. \n Por favor, inténtelo de nuevo.");
        }

      }).catch(
        (error) => {
          setAuthHeader(null);
          setUserNotFound("Usuario no encontrado. \n Por favor, inténtelo de nuevo.");
        }
      );
  };

  const onRegister = async (e, formData) => {
    e.preventDefault();
    request('POST', '/register', formData).then(
      (response) => {
        setAuthHeader(response.data.token);
        sessionStorage.setItem("userId", response.data.id);
        sessionStorage.setItem("username", response.data.username);
        window.location.href = "/";
      }).catch(
        (error) => {
          setAuthHeader(null);
        }
      );
  };


  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
          <div>
          <a href="/" className="logo">
          <img src="/logo.png" className='logo'/></a></div>
            <ul className="menu">
              <li className="menu-item">
                <Link to="/">Inicio</Link>
              </li>
              {getAuthToken() !== null &&
                <li className="menu-item">
                  <Link to="/user">Mi cuenta</Link>
                </li>
              }
              <li className="menu-item">
                <Link to="/about">Sobre nosotros</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contacto</Link>
              </li>
              <li className="menu-item">
                <Link to="/BuscarHerramienta">Buscar Herramienta</Link>
              </li>
              {getAuthToken() === null &&
                <li className="menu-item">
                  <Link to="/login">Iniciar sesión</Link>
                </li>
              }
              {getAuthToken() === null &&
                <li className="menu-item">
                  <Link to="/register">Registrarse</Link>
                </li>
              }
              {getAuthToken() !== null &&
                <li className="menu-item">
                  <Link to="/mytools">Mis Herramientas</Link>
                </li>
              }
              {getAuthToken() !== null &&
                <li className="menu-item">
                  <Link to="/misreservas">Mis Reservas</Link>
                </li>
              }
              {getAuthToken() !== null &&
                <li className="menu-item">
                  <button className="logout" onClick={logout}>Cerrar sesión</button>
                </li>
              }


            </ul>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/BuscarHerramienta" element={<BuscarHerramienta />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {getAuthToken() === null &&
              <Route path="/login" element={<Login onLogin={onLogin} found={userNotFound} />} />}
            {getAuthToken() === null &&
              <Route path="/register" element={<Register onRegister={onRegister} />} />}
            {getAuthToken() !== null &&
              <Route path="/user" element={<User />} />}
            {getAuthToken() !== null &&
              <Route path="/mytools" element={<Tools />} />}
            {getAuthToken() !== null &&
              <Route path="/mytools/publish" element={<PublishTool />} />}
            {getAuthToken() !== null &&
              <Route path="/misreservas" element={<MisReservas />} />}
            {getAuthToken() !== null &&
              <Route path="/reservas/:id" element={<EditarReserva />} />
            }
            <Route path="/tool/:id" element={<ToolDetails />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/mytools/edit/:id" element={<EditTool />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
          </Routes>
        </div>
      </div>
      <Footer/>
      </Router>

  );
}

export default App;
