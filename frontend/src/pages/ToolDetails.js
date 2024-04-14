import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../helpers/axios_helper';
import MapsTool from './MapsTool';

function ToolDetails() {
  const { id } = useParams(); // Obteniendo el ID de la ruta
  const [tool, setTool] = useState({});

  useEffect(() => {
    request('GET', `/herramientas/${id}`)
      .then((response) => {
        console.log(response.data);
        setTool(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
  , [id]);

  return (
    <div>
      <h1>Detalles de la herramienta</h1>
      <p>Disponibilidad: {tool.disponibilidad ? 'Disponible' : 'No disponible'}</p>
      <p>Tipo: {tool.tipo}</p>
      <p>Descripción: {tool.descripcion}</p>
      <p>Precio Diario: {tool.precioDiario}</p>
      <p>Estado Físico: {tool.estadoFisico}</p>
      {tool.usuario && (
        <>
          <h2>Propietario</h2>
          <p>Nombre: {tool.usuario.nombre}</p>
          <p>DNI: {tool.usuario.dni}</p>
          <p>Dirección: {tool.usuario.direccion}</p>
          <p>Email: {tool.usuario.email}</p>
          <p>Teléfono: {tool.usuario.telefono}</p>
          <MapsTool lat={tool.usuario.lat} lng={tool.usuario.lng} />
        </>
      )}
    </div>
  );
}

export default ToolDetails;
