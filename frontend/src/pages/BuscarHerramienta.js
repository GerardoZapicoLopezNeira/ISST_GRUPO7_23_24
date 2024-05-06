import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';
import { Slider, SliderThumb } from '@mui/material';

function BuscarHerramienta() {

    const [tools, setTools] = useState([]);
    const [filteredTools, setFilteredTools] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [sliderValue, setSliderValue] = useState([0, 30]);


    const myTools = async () => {
        request("GET", "/herramientas").then(
            (response) => {
                setTools(response.data);
                setFilteredTools(response.data);
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }

    useEffect(() => {
        myTools();
    }, []);

    const handleFiltro = (filtro) => {
        const filtered = tools.filter(herramienta => {
            const herramientaTipoLower = herramienta.tipo.toLowerCase();
            return herramientaTipoLower.includes(filtro.toLowerCase());
        });
        setFilteredTools(filtered);


    }

    const handleSlider = (event, newValue) => {
        console.log(newValue);
        setSliderValue(newValue);

    }



    useEffect(() => {
        const filteredByPrice = tools.filter(herramienta => {
            return herramienta.precioDiario >= sliderValue[0] && herramienta.precioDiario <= sliderValue[1];
        });
        setFilteredTools(filteredByPrice);
    }
        , [sliderValue]);

    const borrarFiltros = () => {

        setSliderValue([0, 30]);
        document.getElementById('filtro').value = '';
        setFilteredTools(tools);

    }
    return (
        <div className='buscar'>
            <h2 className='about'>Buscar herramientas</h2>
            <h3>Aquí puedes encontrar todas las herramientas disponibles</h3>
            <div className='filtro'>
                <label>Buscar por tipo:</label>
                <input type="text" id="filtro" onChange={(e) => handleFiltro(e.target.value)} />
            </div>

            <br />
            <br />
            <div className='filtroPrecio'>
                <label htmlFor="precio">Filtrar por precio diario:</label>

                <Slider
                    className="slider"
                    getAriaLabel={() => 'Temperature range'}
                    value={sliderValue}
                    onChange={handleSlider}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={1}
                    marks={[
                        {
                            value: 0,
                            label: '0€',
                        },
                        {
                            value: 30,
                            label: '30€',
                        },
                        {
                            value: 60,
                            label: '60€',
                        },
                        {
                            value: 100,
                            label: '100€',
                        },
                    ]}fsef
                />
            </div>

            <button onClick={borrarFiltros} className="btn btn-primary">Borrar filtros</button>





            <ul className='herramientaBuscar'>
                {filteredTools.map(herramienta => (
                    <li key={herramienta.id} >
                        <h3>{herramienta.tipo}</h3>
                        <p>{herramienta.descripcion}</p>
                        <img className='imagenHerramienta' src={`http://localhost:9090/api/v1/herramientas/${herramienta.id}/foto`} alt={herramienta.tipo} />
                        <p>Precio Diario: {herramienta.precioDiario}</p>
                        <Link to={`/tool/${herramienta.id}`}>Ver detalles</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BuscarHerramienta;
