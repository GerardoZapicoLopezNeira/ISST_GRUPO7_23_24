import React, { useEffect, useState } from 'react'
import { request } from '../helpers/axios_helper';

function MisReservas() {

    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        request('GET', '/users/' + localStorage.getItem("userId") + '/reservas').then(
            (response) => {
                console.log(response.data);
                setReservas(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
        , [])

    return (
        <div>
            <h1>Mis Reservas</h1>
            <p>Aquí puedes ver tus reservas</p>
            {reservas.length > 0 ? (
                reservas.map((reserva) => (
                    <div key={reserva.id}>
                        <h3>{reserva.herramienta.tipo}</h3>
                        <p>{reserva.herramienta.descripcion}</p>
                        <p>{reserva.herramienta.precioDiario}</p>
                        <p>Fecha de recogida: {reserva.diaRecogida}/{reserva.mesRecogida}/{reserva.añoRecogida}</p>
                        <p>Fecha de devolución: {reserva.diaDevolucion}/{reserva.mesDevolucion}/{reserva.añoDevolucion}</p>
                        <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/" + reserva.herramienta.id + "/foto"} alt="foto" />
                    </div>
                ))
            ) : (
                <p>¡Todavía no tienes reservas!</p>
            )
            }



        </div>
    )
}

export default MisReservas