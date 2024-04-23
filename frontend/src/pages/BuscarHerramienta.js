import React, { useEffect, useState } from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';
import ToolDetails from './ToolDetails';

function MyTools() {

    const [tools, setTools] = useState([]);

    
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
        const herramientas = localStorage.getItem("herramientas");
        myTools(herramientas);
    }, []);
   

  return (
    <div>
        <h1>Busca tu herramienta deseada</h1>
        <p>Aquí puedes ver todas las herramientas que hay publicadas en nuestro catálogo</p>
        {tools.length>0 ? (
            tools.map((tool) => (
                <div key={tool.id}>
                    <h3>{tool.tipo}</h3>
                    <p>{tool.descripcion}</p>
                    <p>{tool.precioDiario}</p>
                    <Link to={`/tool/${tool.id}`}>Ver más detalles</Link>
                </div>
            ))
        ) : (
            <p>¡Todavía No Existen Herramientas Publicadas!</p>
        )
        }
    </div>
  )
}

export default MyTools