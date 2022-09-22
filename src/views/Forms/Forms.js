import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Form.css';

function Form(props) {
  const { recovery } = props;
  const FormMessage = recovery ? 'Enviar Pin' : 'Iniciar Sesion';
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recovery) {
      navigate('/admin/login');
    } else {
      navigate('/admin/polls-management');
    }
  };

  return (
    <div className="formWrapper">
      <div className="CTAcontainer">
        {recovery ? (
          <div className="inputsContainer">
            <TextField
              className="formInput"
              autoFocus
              type="text"
              placeholder="Email"
              required
            />
            <TextField
              className="formInput"
              type="password"
              placeholder="Pin"
              required
            />
            <Link to="/admin/password-recovery">
              <span className="passwordRecovery">Reenviar codigo</span>
            </Link>
          </div>
        ) : (
          <div className="inputsContainer">
            <TextField
              className="formInput"
              autoFocus
              type="text"
              placeholder="Email"
              required
            />
            <TextField
              className="formInput"
              type="password"
              placeholder="Contraseña"
              required
            />
            <Link to="/admin/password-recovery">
              <span className="passwordRecovery">Recuperar contraseña</span>
            </Link>
          </div>
        )}
        <Button
          variant="contained"
          className="formButton"
          onClick={handleSubmit}
        >
          {FormMessage}
        </Button>
      </div>
    </div>
  );
}

export default Form;
