import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';


function EditUser() {

    const [userData, setUserData] = useState({
        dni: '',
        nombre: '',
        direccion: '',
        email: '',
        telefono: ''
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await request('GET', `/users/${sessionStorage.getItem("username")}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
        console.log(userData);
    }

    const editUser = async (event) => {
        event.preventDefault();
        try {
            const response = await request('PUT', `/users/${sessionStorage.getItem("username")}`, userData);
            window.location.href = "/user";
            ;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const deleteUser = async (event) => {
        event.preventDefault();
        try {
            const response = await request('DELETE', `/users/${sessionStorage.getItem("username")}`);
            setAuthHeader(null);
            window.location.href = "/";
            ;
        } catch (error) {
            console.log('Error:', error);
        }
    }





    return (
        <div>
            <h2 className='about'>Edita tu perfil</h2>
            <p className='buscar'> modi tu información personal</p>
            <div className="register-form">
                <h2>Editar usuario</h2>
                <form onSubmit={editUser}>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dni"
                            name="dni"
                            value={userData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre y apellidos</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            name="direccion"
                            value={userData.direccion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Número de teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="telefono"
                            name="telefono"
                            value={userData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                </form>
                <button className="btn btn-primary" onClick={deleteUser}>Eliminar mi usuario</button>
            </div>
        </div>
    )
}

export default EditUser