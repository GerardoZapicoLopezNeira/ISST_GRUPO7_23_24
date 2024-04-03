import React from 'react'
import { useState } from 'react';
import { Alert } from 'bootstrap';

function Login(props) {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(formData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(event, formData); // Pass formData directly to onRegister
    };
    return (
        <div className="register-form">
                <h2>Inicio de sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Inicia sesión</button>
                    <p>{props.found}</p>
                </form>
            </div>

    )
}

export default Login