// Home.js
import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

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
      
      
    </div>
  );
};

export default Home;
