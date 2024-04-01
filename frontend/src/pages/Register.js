import React, { useState } from 'react';

function Register(props) {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    direccion: '',
    email: '',
    telefono: '',
    username: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onRegister(event, formData); // Pass formData directly to onRegister
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="nombre">Full Name</label>
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
          <label htmlFor="direccion">Address</label>
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Phone Number</label>
          <input
            type="text" 
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
