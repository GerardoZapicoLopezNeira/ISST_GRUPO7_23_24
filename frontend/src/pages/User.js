import React, { useEffect } from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';

function User(props) {


  return (
    <div>
      <h1>Mi cuenta</h1>
      <p>En esta sección podrás ver tu información personal y modificarla si es necesario.</p>
      <h2>Información personal</h2>
      <p>Nombre: {props.userInfo.nombre}</p>
      <p>DNI: {props.userInfo.dni}</p>
      <p>Dirección: {props.userInfo.direccion}</p>
      <p>Email: {props.userInfo.email}</p>
      <p>Teléfono: {props.userInfo.telefono}</p>
      
      
    </div>
  )
}

export default User