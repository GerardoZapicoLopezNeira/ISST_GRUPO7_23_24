import React, { useEffect, useState } from 'react'
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

function MisReservas() {

    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        request('GET', '/users/' + sessionStorage.getItem("userId") + '/reservas').then(
            (response) => {
                ;
                setReservas(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
        , [])

    function cancelarReserva (id) {
        request('DELETE', '/reservas/' + id).then(
            (response) => {
                ;
                setReservas(reservas.filter(reserva => reserva.id !== id));
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }    

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
                        <button onClick={() => cancelarReserva(reserva.id)}>Cancelar reserva</button>
                        <Link to={`/reservas/${reserva.id}`}>Editar reserva</Link>
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