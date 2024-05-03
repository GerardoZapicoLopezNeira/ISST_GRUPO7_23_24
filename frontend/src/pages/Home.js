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
    <div>
      <h2 className='bienvenido'>Cómo funciona DIY4Rent en tres pasos</h2>


      <div className='home'>
  
          <p className='numero'>1. FILTRA </p>
            <div className='difs'><p>Busca la máquina o herramienta que quieres alquilar, la disponibilidad y la zona geográfica dónde quieras.<img src="/lupa.png" className='iconsHome'/> </p></div>
          <p className='numero'>2. ENCUENTRA</p>
           <div className='difs'><p>Ponte en contacto con el aunciante.<img src="/manos.png" className='iconsHomes'/> </p></div>
          <p className='numero'>3. ALQUILA</p>
          <div className='difs'><p> Alquila la herramienta durante el tiempo acordado.<img src="/maqui.png" className='iconsHomess'/> </p></div>

      </div>


      {tools.length > 0 ? (
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>
            <h3>{tool.tipo}</h3>
            <p>Precio diario: ${tool.precioDiario}</p>
            <p>Estado Físico: {tool.estadoFisico}</p>
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
