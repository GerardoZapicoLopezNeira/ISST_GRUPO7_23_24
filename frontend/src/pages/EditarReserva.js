import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../helpers/axios_helper'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EditarReserva(props) {

    const { id } = useParams();

    const [tool, setTool] = useState({});

    const [importe, setImporte] = useState(0);

    const [reservaAntigua, setReservaAntigua] = useState({});
    const newFechasExisteReserva = [];

    const [fechasExisteReserva, setFechasExisteReserva] = useState([]);
    useEffect(() => {

        request('GET', '/reservas/' + id).then(
            (response) => {
                ;
                setReservaAntigua(response.data);
                console.log(response.data.herramienta)
                setTool(response.data.herramienta);
                getFechasOcupadas(response.data.herramienta.id);
                
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );

    }
        , [])

    const getFechasOcupadas= (herramientaId) => {
        request('GET', '/herramientas/' + herramientaId + '/reservas').then(
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

    const editarReserva = () => {

        request('PUT', '/reservas/' + id, reserva).then(
            (response) => {
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

    function cancelarReserva(id) {
        request('DELETE', '/reservas/' + id).then(
            (response) => {
                ;
                window.location.href="/misreservas";
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

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
            <h3>{tool.tipo}</h3>
            <p>{tool.descripcion}</p>
            <p>Precio diario: {tool.precioDiario} euros</p>
            <h2>Reserva anterior</h2>
            <p>Fecha de recogida: {reservaAntigua.diaRecogida}/{reservaAntigua.mesRecogida}/{reservaAntigua.añoRecogida}</p>
            <p>Fecha de devolución: {reservaAntigua.diaDevolucion}/{reservaAntigua.mesDevolucion}/{reservaAntigua.añoDevolucion}</p>
            <p>Importe: {reservaAntigua.importe} euros</p>
            <h2>Nueva reserva</h2>
            <p>Fecha de recogida: {reserva.diaRecogida}/{reserva.mesRecogida}/{reserva.añoRecogida}</p>
            <p>Fecha de devolución: {reserva.diaDevolucion}/{reserva.mesDevolucion}/{reserva.añoDevolucion}</p>
            <p>Nuevo importe: {reserva.importe} euros</p>
            <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/" + tool.id + "/foto"} alt="foto" />
            <h3>Escoge unas fechas disponibles para cambiar la reserva</h3>
            <Calendar minDate={new Date()} onChange={onChangeDates} value={value} selectRange={true} returnValue={"range"} tileDisabled={({ activeStartDate, date, view }) =>
                getDateRange(fechasExisteReserva).some(dateRange =>
                    date.getFullYear() === dateRange.getFullYear() &&
                    date.getMonth() === dateRange.getMonth() &&
                    date.getDate() === dateRange.getDate()
                )
            } />
            <button onClick={() => editarReserva(reserva.id)}>Editar reserva</button>
            <button onClick={() => cancelarReserva(reservaAntigua.id)}>Cancelar reserva</button>




        </div>
    )
}

export default EditarReserva