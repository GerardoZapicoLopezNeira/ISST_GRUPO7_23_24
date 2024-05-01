import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../helpers/axios_helper';


function EditTool() {
    const { id } = useParams(); // Get ID from route
    const [formData, setFormData] = useState({tipo: '',
    descripcion: '',
    disponibilidad: '',
    precioDiario: '',
    estadoFisico: ''});

    useEffect(() => {
        request('GET', `/herramientas/${id}`)
            .then((response) => {
                console.log(response.data);
                setFormData(response.data);            
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, [id]);

    const handleChange = (event) => {
        if (event.target.name === "foto") {
            setFormData({ ...formData, [event.target.name]: event.target.files[0] });
        } else if (event.target.name === "disponibilidad" && event.target.value === "Disponible") {
            setFormData({ ...formData, [event.target.name]: "true" });
        } else if (event.target.name === "disponibilidad" && event.target.value === "No disponible") {
            setFormData({ ...formData, [event.target.name]: "false" });
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
        console.log(formData);
    };

    const editTool = async (event, formData) => {
        event.preventDefault();
        try {
            const response = await request('PUT', `/herramientas/${id}`, formData);
            window.location.href = "/mytools";
            console.log(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const deleteTool = async (event) => {
        event.preventDefault();
        try {
            const response = await request('DELETE', `/herramientas/${id}`);
            window.location.href = "/mytools";
            console.log(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }


    return (
        <div>
            <h1>Editar herramienta</h1>
            <p>Modifica los datos de tu herramienta</p>
            <form onSubmit={(event) => editTool(event, formData)}>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de herramienta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
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
                            value={formData.descripcion}
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
                            min="0"
                            name="precioDiario"
                            value={formData.precioDiario}
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
                 {/*   <div className="form-group">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="file"
                            className="form-control"
                            id="foto"
                            name="foto"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
    </div> */}

                    <button type="submit" className="btn btn-primary">
                        Publicar
                    </button>

                </form>
                <button type="button" className="btn btn-danger" onClick={(event) => deleteTool(event)}>
                        Eliminar
                </button>
        </div>
    );
}

export default EditTool;