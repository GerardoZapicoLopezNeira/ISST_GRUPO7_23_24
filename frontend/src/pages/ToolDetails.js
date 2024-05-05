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


  const [importe, setImporte] = useState(0);

  const newFechasExisteReserva = [];

  const [fechasExisteReserva, setFechasExisteReserva] = useState([]);
  useEffect(() => {
    request('GET', `/herramientas/${id}`)
      .then((response) => {
        ;
        setTool(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

      if (getAuthToken() !== null) {
        request('GET', '/herramientas/'+id+'/reservas').then(
          (response) => {
            ;
  
            const dates = [];
  
            for (let i = 0; i < response.data.length; i++) {
              let fechaInicio = new Date(response.data[i].añoRecogida, response.data[i].mesRecogida - 1, response.data[i].diaRecogida);
              let fechaFin = new Date(response.data[i].añoDevolucion, response.data[i].mesDevolucion - 1, response.data[i].diaDevolucion);
              newFechasExisteReserva.push([fechaInicio, fechaFin]); // Add range to new array
            }            
            setFechasExisteReserva(newFechasExisteReserva);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      }  
  
  }, [id]);

  const hacerReserva = () => {

    request('POST', '/reservas/'+ sessionStorage.getItem("userId") + '/' + tool.id, reserva).then(
      (response) => {

        ;
        window.location.href = "/misreservas";
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  const [value, setValue] = useState(new Date()); // Format: new Date(Date.parse(Año,Mes,Día)) Enero es el mes 0
  // Guardamos Día, Mes y Año

  const [reserva, setReserva] = useState({})


  function onChangeDates(range) {
    setValue(range);

    let days = 0;
    if (range[0].getMonth() === range[1].getMonth()) {
      // Same month
      days = range[1].getDate() - range[0].getDate() + 1;
    } else {
      // Different months
      const daysInStartMonth = new Date(range[0].getFullYear(), range[0].getMonth() + 1, 0).getDate();
      days = daysInStartMonth - range[0].getDate() + range[1].getDate();
    }
  
    setImporte(days * tool.precioDiario);
    let importeReserva = days * tool.precioDiario;
    setReserva({
      añoRecogida: range[0].getFullYear(),
      mesRecogida: range[0].getMonth() + 1,
      diaRecogida: range[0].getDate(),
      añoDevolucion: range[1].getFullYear(),
      mesDevolucion: range[1].getMonth() + 1,
      diaDevolucion: range[1].getDate(),
      importe: importeReserva,
      estado: "Pendiente"
    })
    
    console.log(reserva);
  }



  function getDateRange(dateRanges) {
    
    // Ensure valid input data type
    if (!Array.isArray(dateRanges)) {
      throw new TypeError('Input must be an array of arrays');
    }
  
    const dates = [];
    for (const range of dateRanges) {
      // Ensure valid Date objects for start and end dates
      const startDate = new Date(range[0]);
      const endDate = new Date(range[1]);
  
      // Handle invalid dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        continue; // Skip invalid ranges
      }
  
      let currentDate = startDate;
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
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
      <p>Precio Diario: {tool.precioDiario} euros</p>
      <p>Estado Físico: {tool.estadoFisico}</p>
      <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/"+tool.id+"/foto"} alt="foto" />
      {tool.usuario && (
        <>
          <h2>Propietario</h2>
          <p>Nombre: {tool.usuario.nombre}</p>
          <p>DNI: {tool.usuario.dni}</p>
          <p>Dirección: {tool.usuario.direccion}</p>
          <p>Email: {tool.usuario.email}</p>
          <p>Teléfono: {tool.usuario.telefono}</p>
          {sessionStorage.getItem("userId")==tool.usuario.id ? (<p>¡No puedes reservar tu propia herramienta, bribón!</p>) : getAuthToken() !== null ? (
            <>
              <Calendar minDate={new Date()} onChange={onChangeDates} value={value} selectRange={true} returnValue={"range"} tileDisabled={({ activeStartDate, date, view }) =>
                getDateRange(fechasExisteReserva).some(dateRange =>
                  date.getFullYear() === dateRange.getFullYear() &&
                  date.getMonth() === dateRange.getMonth() &&
                  date.getDate() === dateRange.getDate()
                )
              } />
              <p>Importe de la reserva: {importe} euros</p>
              <button onClick={hacerReserva}>Reserva</button>
            </>
          ) : (<p>Para ver la disponibilidad de la herramienta y reservarla autentícate.</p>)}
          <MapsTool lat={tool.usuario.lat} lng={tool.usuario.lng} />
        </>
      )}
    </div>
  );
}
export default ToolDetails;