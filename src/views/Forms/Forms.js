import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../../util/Requests';
import { auth } from '../../util/auth';
import './Form.css';

function Form(props) {
  const { recovery } = props;
  const FormMessage = recovery ? 'Enviar Pin' : 'Iniciar Sesion';
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    const loginData = {
      admin_name: userName,
      admin_password: password
    };

    const res = await Login(loginData);

    if (res.response) {
      setError(res.response.data.message);
      return;
    }

    auth.signin(res.data.token);

    if (recovery) {
      navigate('/admin/login');
    } else {
      navigate('/admin/polls-management');
    }
  };

  const handleEmail = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
              onChange={handleEmail}
              required
            />
            <TextField
              className="formInput"
              type="password"
              placeholder="Pin"
              onChange={handlePassword}
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
              onChange={handleEmail}
              required
            />
            <TextField
              className="formInput"
              type="password"
              placeholder="Contraseña"
              onChange={handlePassword}
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
        <span className="error"> {error || null} </span>
      </div>
    </div>
  );
}

export default Form;
