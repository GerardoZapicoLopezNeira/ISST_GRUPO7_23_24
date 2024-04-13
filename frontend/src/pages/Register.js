import { useGeolocation } from '@uidotdev/usehooks';
import React, { useState } from 'react';

function Register(props) {


  const setLocation = () => {
    if (!navigator.geolocation) {
      console.log("Tu navegador no sorporta Geolocalización")
    } else if (formData.lat !== '') {
      console.log("Geo loc ya registrada")
    } else {
      navigator.geolocation.getCurrentPosition(setLoc, errorLoc)
    }

    function setLoc(position) {
      const crd = position.coords
      setFormData({ ...formData, lat: crd.latitude, lng: crd.longitude})
    }
    
    function errorLoc() {
      console.log("No se pudo almacenar tu localización.")
    }
  }



  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    direccion: '',
    email: '',
    telefono: '',
    username: '',
    password: '',
    lat: '',
    lng: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });    
    
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation();
    props.onRegister(event, formData); // Pass formData directly to onRegister
  };

  return (
    <div className="register-form">
      <h2>Registro de usuario</h2>
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
        <div className="form-group">
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            className="form-control"
            id="dni"
            name="dni"
            value={formData.dni}
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
            value={formData.nombre}
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
            value={formData.direccion}
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
            value={formData.email}
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
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        {Object.keys(validationErrors).length > 0 && (  // Display errors if any
          <div className="error-messages">
            {Object.values(validationErrors).map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;
