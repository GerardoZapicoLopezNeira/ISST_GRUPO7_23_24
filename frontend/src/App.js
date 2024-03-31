// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchTools from './pages/SearchTools';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
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
                <Link to="/about">About</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="menu-item">
                <Link to="/search">Search Tools</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchTools />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
