import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../helpers/axios_helper'

function EditarReserva(props) {

    const { id } = useParams();

    const [reserva, setReserva] = useState([]);
    useEffect(() => {

        request('GET', '/reservas/' + id).then(
            (response) => {
                console.log(response.data);
                setReserva(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );


    }
        , [])

    function cancelarReserva(id) {
        request('DELETE', '/reservas/' + id).then(
            (response) => {
                console.log(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }
    return (
        <div>
            <h3>{reserva.herramienta.tipo}</h3>
            <p>{reserva.herramienta.descripcion}</p>
            <p>{reserva.herramienta.precioDiario}</p>
            <p>Fecha de recogida: {reserva.diaRecogida}/{reserva.mesRecogida}/{reserva.añoRecogida}</p>
            <p>Fecha de devolución: {reserva.diaDevolucion}/{reserva.mesDevolucion}/{reserva.añoDevolucion}</p>
            <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/" + reserva.herramienta.id + "/foto"} alt="foto" />
            <button onClick={cancelarReserva(reserva.id)}>Cancelar reserva</button>


        

        </div>
    )
}

export default EditarReserva