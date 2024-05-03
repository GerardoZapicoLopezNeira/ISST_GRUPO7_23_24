import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

function BuscarHerramienta() {

    const [tools, setTools] = useState([]);

    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    
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

    useEffect(() => {
        myTools();
    }, []);

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        request("GET", `/herramientas?precioMin=${precioMin}&precioMax=${precioMax}`).then(
            (response) => {
                setTools(response.data);
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <div>
            <h1>Buscar herramientas</h1>
            <p>Aquí puedes encontrar todas las herramientas disponibles:</p>

            <form onSubmit={handleFilterSubmit}>
                <label htmlFor="precioMin">Precio Mínimo:</label>
                <input type="number" id="precioMin" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
                <label htmlFor="precioMax">Precio Máximo:</label>
                <input type="number" id="precioMax" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
                <button type="submit">Aplicar filtro</button>
            </form>

            <ul>
                {tools.map(herramienta => (
                    <li key={herramienta.id} >
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
