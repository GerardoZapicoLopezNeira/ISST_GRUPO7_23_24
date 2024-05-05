import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import MapsUser from './MapsUser';
import { Link } from 'react-router-dom';

function User() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await request('GET', `/users/${sessionStorage.getItem("username")}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="userData">
      <h2 className='about'>Mi perfil</h2>
      <p className='buscar'>En esta sección podrás ver tu información personal y modificarla si es necesario</p>
      <div className='myUser'>
        <div className='myUserInfo'>
        <h2>Información personal</h2>
        {userData ? (
          <>
            <p>Nombre: {userData.nombre}</p>
            <p>DNI: {userData.dni}</p>
            <p>Dirección: {userData.direccion}</p>
            <p>Email: {userData.email}</p>
            <p>Teléfono: {userData.telefono}</p>
            <Link to={`/user/edit/${userData.id}`}>Editar usuario</Link>
          </>
        ) : (
          <p className='buscar'>Cargando datos del usuario...</p>
        )}

        </div>

        <MapsUser lat={userData.lat} lng={userData.lng} />
      </div>

    </div>
  );
}

export default User;
