// Home.js
import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {

  const [tools, setTools] = useState([]);

  useEffect (()=> {
    request('GET', '/herramientas')
    .then((response) => {
      console.log(response.data);
      setTools(response.data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });

  }, []);
   
  return (
    <div className='home'>
      <h2>Bienvenido a DIY4Rent</h2>
      <h3>¡Encuentra todas las herramientas que necesitas para tu proyecto!</h3>
      <p>Aquí puedes buscar de entre todas las herramientas publicadas en nuestra plataforma</p>
      {tools.length > 0 ? (
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>
            <h3>{tool.tipo}</h3>
            <p>Precio diario: ${tool.precioDiario}</p>
            <p>Estado Físico: {tool.estadoFisico}</p>
            <img className='imagenHerramienta' src={`http://localhost:9090/api/v1/herramientas/${tool.id}/foto`} alt={tool.tipo} />
            <p>Propietario: {tool.usuario.nombre}</p>
            <Link to={`/tool/${tool.id}`}>Ver más detalles</Link>
          </li>
        ))}
      </ul>) : (
        <p>Loading tools...</p>
      )  
      }
    </div>
  );
};

export default Home;
