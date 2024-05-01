import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

function BuscarHerramienta() {

    const [tools, setTools] = useState([]);
    const [precioFiltrado, setPrecioFiltrado] = useState('');

    
    const myTools = async () => {
        request("GET", "/herramientas").then(
            (response) => {
                console.log(response.data);
                setTools(response.data);
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }

    const filtrarPorPrecio = () => {
        const herramientasFiltradas = tools.filter(herramienta => herramienta.precioDiario < precioFiltrado);
        setTools(herramientasFiltradas);
    };

    useEffect(() => {
        myTools();
    }, []);


    return (
        <div>
            <h1>Buscar tools</h1>
            <p>Aquí puedes encontrar todas las tools disponibles:</p>

            <input type="number" value={precioFiltrado} onChange={(e) => setPrecioFiltrado(e.target.value)} />
            <button onClick={filtrarPorPrecio}>Filtrar por precio diario</button>

            <ul>
                {tools.map(herramienta => (
                    <li key={herramienta.id}>
                        <h3>{herramienta.tipo}</h3>
                        <p>{herramienta.descripcion}</p>
                        <p>Precio Diario: {herramienta.precioDiario}</p>
                        <Link to={`/tool/${herramienta.id}`}>Ver detalles</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BuscarHerramienta;
