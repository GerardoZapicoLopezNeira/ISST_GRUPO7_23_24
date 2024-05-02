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
        setPrecioFiltradoMin(0);
        setPrecioFiltradoMax(0);
        setFiltroTipo('');
        myTools();
    };

    useEffect(() => {
        myTools();
    }, []);

    // Generar opciones para el desplegable de precio mínimo
    const opcionesPrecioMin = [];
    for (let i = 0; i <= 200; i += 10) {
        opcionesPrecioMin.push(<option key={i} value={i}>{i}</option>);
    }

    // Generar opciones para el desplegable de precio máximo
    const opcionesPrecioMax = [];
    for (let i = 0; i <= 200; i += 10) {
        opcionesPrecioMax.push(<option key={i} value={i}>{i}</option>);
    }


    return (
        <div>
            <h1>Buscar herramientas</h1>
            <p>Aquí puedes encontrar todas las herramientas disponibles:</p>

            <div>
                <label htmlFor="min">Precio mínimo:</label>
                <select id="min" value={precioFiltradoMin} onChange={(e) => setPrecioFiltradoMin(e.target.value)}>
                    {opcionesPrecioMin}
                </select>
            </div>
            <div>
                <label htmlFor="max">Precio máximo:</label>
                <select id="max" value={precioFiltradoMax} onChange={(e) => setPrecioFiltradoMax(e.target.value)}>
                    {opcionesPrecioMax}
                </select>
            </div>
            <div>
                <label htmlFor="filtroTipo">Filtrar por tipo:</label>
                <input type="text" id="filtroTipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} />
            </div>


            <button onClick={filtrarHerramientas}>Filtrar</button>
            <button onClick={limpiarFiltros}>Limpiar filtros</button>


            {tools.length > 0 && (
                <ul className="herramienta-search">

                    {
                        tools.map(herramienta => (
                            <li key={herramienta.id} >
                                <h3>{herramienta.tipo}</h3>
                                <p>{herramienta.descripcion}</p>
                                <p>Precio Diario: {herramienta.precioDiario}</p>
                                <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/"+herramienta.id+"/foto"} alt="foto"/>
                                <Link to={`/tool/${herramienta.id}`}>Ver detalles</Link>
                            </li>
                        ))
                    }
                </ul>

            )}

        </div>
    );
}

export default BuscarHerramienta;
