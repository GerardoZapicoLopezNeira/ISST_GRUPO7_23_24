import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

function BuscarHerramienta() {

    const [tools, setTools] = useState([]);
    const [precioFiltradoMin, setPrecioFiltradoMin] = useState('');
    const [precioFiltradoMax, setPrecioFiltradoMax] = useState('');

    const [filtroTipo, setFiltroTipo] = useState('');

    
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

    const filtrarHerramientas = () => {
        const herramientasFiltradas = tools.filter(herramienta => {
            const precio = herramienta.precioDiario;
            const min = precioFiltradoMin === '' || parseFloat(precioFiltradoMin) <= precio;
            const max = precioFiltradoMax === '' || parseFloat(precioFiltradoMax) >= precio;
            const contieneTipo = filtroTipo === '' || herramienta.tipo.toLowerCase().includes(filtroTipo.toLowerCase());

            return min && max && contieneTipo;
        });
        setTools(herramientasFiltradas);
    };

    const limpiarFiltros = () => {
        setPrecioFiltradoMin('');
        setPrecioFiltradoMax('');
        setFiltroTipo('');
        myTools();
    };

    useEffect(() => {
        myTools();
    }, []);

    // Generar opciones para el desplegable de precio mínimo
    const opcionesPrecioMin = [];
    for (let i = 10; i <= 200; i += 10) {
        opcionesPrecioMin.push(<option key={i} value={i}>{i}</option>);
    }

    // Generar opciones para el desplegable de precio máximo
    const opcionesPrecioMax = [];
    for (let i = 10; i <= 200; i += 10) {
        opcionesPrecioMax.push(<option key={i} value={i}>{i}</option>);
    }


    return (
        <div>
            <h1>Buscar tools</h1>
            <p>Aquí puedes encontrar todas las tools disponibles:</p>

            <div>
                <label htmlFor="min">Precio mínimo:</label>
                <select id="min" value={precioFiltradoMin} onChange={(e) => setPrecioFiltradoMin(e.target.value)}>
                    <option value="">Sin mínimo</option>
                    {opcionesPrecioMin}

                    
                </select>
            </div>
            <div>
                <label htmlFor="max">Precio máximo:</label>
                <select id="max" value={precioFiltradoMax} onChange={(e) => setPrecioFiltradoMax(e.target.value)}>
                    <option value="">Sin máximo</option>
                    {opcionesPrecioMax}
                </select>
            </div>
            <div>
                <label htmlFor="filtroTipo">Filtrar por tipo:</label>
                <input type="text" id="filtroTipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} />
            </div>

            
            <button onClick={filtrarHerramientas}>Filtrar</button>
            <button onClick={limpiarFiltros}>Limpiar filtros</button>


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
