import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { request, getAuthToken } from '../helpers/axios_helper';
import MapsTool from './MapsTool';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ToolDetails() {
  const { id } = useParams();
  const [tool, setTool] = useState({});
  const navigate = useNavigate(); // Usa useNavigate para la navegación
 
  const start = new Date(2024, 4, 13); // Year, Month (0 indexed - May is 4), Day
  const end = new Date(2024, 4, 15); // Year, Month (0 indexed - July is 6), Day

  useEffect(() => {
    request('GET', `/herramientas/${id}`)
      .then((response) => {
        console.log(response.data);
        setTool(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
      
  }, [id]);

  const hacerReserva = async () => {

    request()
  }

  const [value, setValue] = useState(new Date()); // Format: new Date(Date.parse(Año,Mes,Día)) Enero es el mes 0
  // Guardamos Día, Mes y Año

  const [fechasReserva, setFechasReserva] = useState({
    añoInicio: 0,
    mesInicio: 0,
    diaInicio: 0,
    añoFin: 0,
    mesFin: 0,
    diaFin: 0
  })

  const [fechasExisteReserva, setFechasExisteReserva] = useState({})

  function onChangeDates(range) {
    setValue(range);
    setFechasReserva({
      añoInicio: range[0].getFullYear(),
      mesInicio: range[0].getMonth()+1,
      diaInicio: range[0].getDate(),
      añoFin: range[1].getFullYear(),
      mesFin: range[1].getMonth()+1,
      diaFin: range[1].getDate()
    })

  }

  function getDateRange(startDate, endDate) {
    // Ensure valid Date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  
    // Handle invalid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return [];
    }
  
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
      

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
          {getAuthToken() !== null ? (
          <>
          <Calendar minDate={new Date()} onChange={onChangeDates} value={value} defaultActiveStart={value} selectRange={true} returnValue={"range"} tileDisabled={({ activeStartDate, date, view}) => 
            getDateRange(start, end).some(dateRange =>
              date.getFullYear() === dateRange.getFullYear() &&
              date.getMonth() === dateRange.getMonth() &&
              date.getDate() === dateRange.getDate()
            )          
          }/>
          <button>Reserva</button>
          </>      
          ) : (<p>Para ver la disponibilidad de la herramienta y reservarla autentícate.</p>)}
          <MapsTool lat={tool.usuario.lat} lng={tool.usuario.lng} />
        </>
      )}
    </div>
  );
}
export default ToolDetails;