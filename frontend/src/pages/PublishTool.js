import React, { useState } from 'react'
import { request, uploadFile } from '../helpers/axios_helper';

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
        if (event.target.name === "disponibilidad" && event.target.value === "Disponible") {
            setInfoTool({ ...infoTool, [event.target.name]: "true" });
        } else if (event.target.name === "disponibilidad" && event.target.value === "No disponible") {
            setInfoTool({ ...infoTool, [event.target.name]: "false" });
        } else {
            setInfoTool({ ...infoTool, [event.target.name]: event.target.value });
        }
        console.log(infoTool);
    };

    const handleFoto = (event) => {
        console.log(event.target.files[0]);
        setFotoToUpload(event.target.files[0]);
    };

    const publishTool = async (event, infoTool) => {
        event.preventDefault();
    
        if (fotoToUpload) {
            try {
                // Photo upload successful, proceed with tool info submission
                const infoResponse = await request("POST", "/users/" + sessionStorage.getItem("userId") + "/herramientas", infoTool);
                const fotoResponse = await uploadFile("POST", "/herramientas/" + infoResponse.data.id + "/foto", fotoToUpload);

                console.log(fotoResponse.data);
                console.log(infoResponse.data);
                window.location.href = "/mytools";
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            // Handle case if no photo is uploaded (optional: prompt user)
            console.warn("No photo selected for upload");
        }
    };
    


    return (
        <div>
            <h2 className='about'>Publicar herramienta en DIY4Rent</h2>
            <p className='buscar'>Recuerda que tienes que rellenar todos los campos</p>
            <div className="register-form">
                <h2>Publicar herramienta</h2>
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

                    <button type="submit"  className="btn btn-primary">
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PublishTool;