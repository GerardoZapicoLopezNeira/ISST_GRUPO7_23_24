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
import './App.css';
import { getAuthToken, request, setAuthHeader } from './helpers/axios_helper';

function App() {

  const [userInfo, setUserInfo] = useState({
    "username": "",
    "email": "",
    "telefono": "",
    "direccion": "",
    "dni": "",
    "nombre": ""
  });

  const logout = () => {
    setAuthHeader(null);
    window.location.href = "/";
  };

  const onLogin = async (e, formData) => {
    e.preventDefault();
    request("POST", "/login", formData).then(
        (response) => {
          setAuthHeader(response.data.token);
          console.log(response.data.username);
          setUserInfo({
            "username": response.data.username,
            "email": response.data.email,
            "telefono": response.data.telefono,
            "direccion": response.data.direccion,
            "dni": response.data.dni,
            "nombre": response.data.nombre
          });
          window.location.href = "/";
          console.log(response.data);
        }).catch(
          (error) => {
            setAuthHeader(null);
          }
        );
  };

  const onRegister = async (event, formData) => {
    event.preventDefault();
    console.log(formData)
    request('POST', '/register', formData).then(
      (response) => {
        setAuthHeader(response.data.token);
        setUserInfo({
          "username": response.data.username,
          "email": response.data.email,
          "telefono": response.data.telefono,
          "direccion": response.data.direccion,
          "dni": response.data.dni,
          "nombre": response.data.nombre
        });
        window.location.href = "/";
        console.log(response.data);
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
                <Link to="/">Home</Link>
              </li>
              <li className="menu-item">
                <Link to="/search">Search Tools</Link>
              </li>
              {getAuthToken() !== null &&
                <li className="menu-item">
                  <Link to="/user">Mi cuenta</Link>
                </li>
              }
              <li className="menu-item">
                <Link to="/about">About</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contact</Link>
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
                  <button className="logout" onClick={logout}>Cerrar sesión</button>
                </li>
              }
              


            </ul>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchTools />} />
            {getAuthToken() === null &&
            <Route path="/login" element={<Login onLogin={onLogin} />} />}
            {getAuthToken() === null &&
            <Route path="/register" element={<Register onRegister={onRegister} />} />}
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
