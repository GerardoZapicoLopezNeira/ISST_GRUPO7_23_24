import React, { useEffect, useState } from 'react'
import { getAuthToken, request, setAuthHeader } from '../helpers/axios_helper';

function PublishTool() {

    const [infoTool, setInfoTool] = useState({
        tipo: '',
        descripcion: '',
        disponibilidad: '',
        precioDiario: '',
        estadoFisico: ''
    });
    const [fotoToUpload, setFotoToUpload] = useState();

    const handleChange = (event) => {
        if (event.target.name === "foto") {
            setInfoTool({ ...infoTool, [event.target.name]: event.target.files[0] });
        } else if (event.target.name === "disponibilidad" && event.target.value === "Disponible") {
            setInfoTool({ ...infoTool, [event.target.name]: "true" });
        } else if (event.target.name === "disponibilidad" && event.target.value === "No disponible") {
            setInfoTool({ ...infoTool, [event.target.name]: "false" });
        } else {
            setInfoTool({ ...infoTool, [event.target.name]: event.target.value });
        }
        console.log(infoTool);
    };

    const handleFoto = (event) => {
        setFotoToUpload(event.target.files[0]);
    };

    const publishFoto = async (event, foto, toolId) => {
        event.preventDefault();
        request("POST", "/herramientas" + toolId + "/foto", foto).then(
            (response)=> {

            }
        ).catch(
            (error)=> {
                console.log(error);
            }
        );
    }

    const publishTool = async (event, infoTool) => {
        event.preventDefault();
        request("POST", "/users/" + localStorage.getItem("userId") + "/herramientas", infoTool).then(
            (response) => {
                console.log(response.data);
                //publishFoto(event, fotoToUpload, response.data.id)
                window.location.href = "/mytools";
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }


    return (
        <div>
            <h1>Publica tu herramienta</h1>
            <p>Aquí puedes publicar tu nueva herramienta</p>
            <p>Recuerda que tienes que rellenar todos los campos</p>
            <div className="register-form">
                <h2>Publicar una herramienta</h2>
                <form onSubmit={(event) => publishTool(event, infoTool)}>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de herramienta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tipo"
                            name="tipo"
                            value={infoTool.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={infoTool.descripcion}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={50}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="disponibilidad">Disponibilidad</label>
                        <select type="text" className="form-control" id="disponibilidad" name="disponibilidad" defaultValue="Seleccione una" onChange={handleChange} required>
                            <option value="No disponible">Seleccione una</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioDiario">Precio diario</label>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            id="precioDiario"
                            name="precioDiario"
                            min="0"
                            value={infoTool.precioDiario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estadoFisico">Estado físico</label>
                        <select type="text" className="form-control" id="estadoFisico" name="estadoFisico" defaultValue="Seleccione una" onChange={handleChange} required>
                            <option value="">Seleccione una</option>
                            <option value="Muy bueno" >Muy bueno</option>
                            <option value="Bueno">Bueno</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="file"
                            className="form-control"
                            id="foto"
                            name="foto"
                            accept="image/*"
                            onChange={handleFoto}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PublishTool;