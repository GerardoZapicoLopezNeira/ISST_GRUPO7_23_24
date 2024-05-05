import React, { useEffect, useState, useRef } from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';


function MyTools() {

    const [tools, setTools] = useState([]);


    const myTools = async (id_user) => {
        request("GET", "/users/" + id_user + "/herramientas").then(
            (response) => {
                ;
                setTools(response.data);
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }

    


    useEffect(() => {
        const id_user = sessionStorage.getItem("userId");
        myTools(id_user);
        
    }, []);


    return (
        <div>
            <h1>My Tools</h1>
            <p>Here you can manage your tools</p>
            {tools.length > 0 ? (
                tools.map((tool) => (
                    <div key={tool.id}>
                        <h3>{tool.tipo}</h3>
                        <p>{tool.descripcion}</p>
                        <p>{tool.precioDiario}</p>
                        <img className="imagenHerramienta" src={"http://localhost:9090/api/v1/herramientas/"+tool.id+"/foto"} alt="foto"/>
                        <Link to={`/mytools/edit/${tool.id}`}>Editar detalles</Link>
                    </div>
                ))
            ) : (
                <p>¡Todavía no tienes herramientas publicadas!</p>
            )
            }
            <Link to="/myTools/publish"><button>Publica aquí tu nueva herramienta</button></Link>

        </div>
    )
}

export default MyTools