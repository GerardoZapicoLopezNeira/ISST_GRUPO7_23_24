import React, { useEffect, useState} from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';
import Maps from './Maps';

function User() {
  


  return (
    <div>
      <h1>Mi cuenta</h1>
      <p>En esta sección podrás ver tu información personal y modificarla si es necesario.</p>
      <h2>Información personal</h2>
      <p>Nombre: {localStorage.getItem("nombre")}</p>
      <p>DNI: {localStorage.getItem("dni")}</p>
      <p>Dirección: {localStorage.getItem("direccion")}</p>
      <p>Email: {localStorage.getItem("email")}</p>
      <p>Teléfono: {localStorage.getItem("telefono")}</p>
      
      <Maps />

    </div>
  )
}

export default User