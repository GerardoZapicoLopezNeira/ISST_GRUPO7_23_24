// App.js
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchTools from './pages/SearchTools';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Tools from './pages/MyTools';
import PublishTool from './pages/PublishTool';
import './App.css';
import { getAuthToken, request, setAuthHeader } from './helpers/axios_helper';

function App() {

  const [userNotFound, setUserNotFound] = useState(null);

  

  const logout = () => {
    setAuthHeader(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("telefono");
    localStorage.removeItem("direccion");
    localStorage.removeItem("dni");
    localStorage.removeItem("nombre");
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");

    window.location.href = "/";
  };

  const onLogin = async (e, formData) => {
    e.preventDefault();
    request("POST", "/login", formData).then(
      (response) => {
        setAuthHeader(response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("telefono", response.data.telefono);
        localStorage.setItem("direccion", response.data.direccion);
        localStorage.setItem("dni", response.data.dni);
        localStorage.setItem("nombre", response.data.nombre);
        localStorage.setItem("lat", response.data.lat);
        localStorage.setItem("lng", response.data.lng);
        setUserNotFound(null);
        window.location.href = "/";
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
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("telefono", response.data.telefono);
        localStorage.setItem("direccion", response.data.direccion);
        localStorage.setItem("dni", response.data.dni);
        localStorage.setItem("nombre", response.data.nombre);
        localStorage.setItem("lat", response.data.lat);
        localStorage.setItem("lng", response.data.lng);
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
            <h1 className="logo">DIY4Rent</h1>
            <ul className="menu">
              <li className="menu-item">
                <Link to="/">Inicio</Link>
              </li>
              {/*            
              <li className="menu-item">
                <Link to="/search">Busca herramientas</Link>
              </li>
*/}
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
                  <button className="logout" onClick={logout}>Cerrar sesión</button>
                </li>
              }




            </ul>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/*<Route path="/search" element={<SearchTools />} />*/}
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
