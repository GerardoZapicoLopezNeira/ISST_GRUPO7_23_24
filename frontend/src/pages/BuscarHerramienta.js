import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

function BuscarHerramienta() {

    const [tools, setTools] = useState([]);
    const [filtro, setFiltro] = useState('');
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
        const queryParams = {};
    
        if (filtro !== '') {
            queryParams.filtro = filtro;
        }
    
        if ( precioMin !== '' && precioMax !== ''){
            queryParams.precioMin = precioMin;
            queryParams.precioMax = precioMax;
        } else if (precioMax !== '') {
            queryParams.precioMax = precioMax;
        } else if (precioMin !== ''){
            queryParams.precioMin = precioMin;
        }
    
        const queryString = new URLSearchParams(queryParams).toString();
    
        request("GET", `/herramientas?${queryString}`).then(
            (response) => {
                setTools(response.data);
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }

    const clearFilters = () => {
        setFiltro('');
        setPrecioMin('');
        setPrecioMax('');
        myTools(); // Llamar a la función para mostrar todas las herramientas sin filtro
    }

    return (
        <div>
            <h1>Buscar herramientas</h1>
            <p>Aquí puedes encontrar todas las herramientas disponibles:</p>

            <form onSubmit={handleFilterSubmit}>
                <label htmlFor="filtro">Buscar:</label>
                <input type="text" id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
                <label htmlFor="precioMin">Precio Mínimo:</label>
                <input type="number" id="precioMin" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} />
                <label htmlFor="precioMax">Precio Máximo:</label>
                <input type="number" id="precioMax" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
                <button type="submit">Aplicar filtro</button>
                <button onClick={clearFilters}>Limpiar filtros</button>

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
