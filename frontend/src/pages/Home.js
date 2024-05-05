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
      ;
      setTools(response.data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });

  }, []);
   
  return (
    <div className='home'>
      <h2 className='about'>Cómo funciona DIY4Rent en tres sencillos pasos</h2>
      <h3 className='numero'>1. Busca</h3>
      <p className='difs'>Filtra la búsqueda de tu herramienta y conoce nuestro catálogo de herramientas disponibles y acorde a tus necesidades. <img src="/lupa.png" className='iconsHome'/></p>
      <h3 className='numero'>2. Encuentra</h3>
      <p className='difs'>Encuentra la herramienta que necesitabas, ponte en contacto con el anunciante y procede al método de reserva. <img src="/manos.png" className='iconsHomes'/></p>
      <h3 className='numero'>3. Alquila</h3>
      <p className='difs'>Alquila durante el tiempo que lo necesites. <img src="/maqui.png" className='iconsHomess'/></p>
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
        <p></p>
      )  
      }
    </div>
  );
};

export default Home;
