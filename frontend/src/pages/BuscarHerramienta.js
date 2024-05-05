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
        setFilteredTools(tools);

    }
    return (
        <div>
            <h2 className='about'>Buscar herramientas</h2>
            <div className='buscar'>
            <p>Aquí puedes encontrar todas las herramientas disponibles:</p>

            <label htmlFor="filtro">Buscar por tipo:</label>
            <input className='caja' type="text" id="filtro" onChange={(e) => handleFiltro(e.target.value)} />
            <br />
            <br/>
            <label htmlFor="precio">Precio Diario:</label>
            </div>

            <Slider
                className="slider"
                getAriaLabel={() => 'Temperature range'}
                value={sliderValue}
                onChange={handleSlider}
                valueLabelDisplay="auto"
                getAriaValueText={(value) => `${value}°C`}
            />
            <button onClick={borrarFiltros} className="btn btn-primary">Borrar filtros</button>





            <ul>
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
