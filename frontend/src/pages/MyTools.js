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
            <h2 className='about'>Mis herramientas</h2>
            <p  className='buscar'>Edita tus herramientas</p>
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
                <p className='buscar'>¡Todavía no tienes herramientas publicadas!</p>
            )
            }
            <Link to="/myTools/publish"><button  className="btn btn-primary">Publica aquí tu nueva herramienta</button></Link>

        </div>
    )
}

export default MyTools