import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import MapsUser from './MapsUser';

function User() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await request('GET', `/users/${localStorage.getItem("username")}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Mi cuenta</h1>
      <p>En esta sección podrás ver tu información personal y modificarla si es necesario.</p>
      <h2>Información personal</h2>
      {userData ? (
        <>
          <p>Nombre: {userData.nombre}</p>
          <p>DNI: {userData.dni}</p>
          <p>Dirección: {userData.direccion}</p>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.telefono}</p>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
      
      <MapsUser lat={userData.lat} lng={userData.lng}/>
    </div>
  );
}

export default User;
