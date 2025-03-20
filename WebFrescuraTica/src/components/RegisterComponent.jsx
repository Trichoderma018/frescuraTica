import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Input, Checkbox, FormControlLabel, Box, Typography, FormControl, FormLabel } from "@mui/material";
import { Lock } from "@mui/icons-material";
import llamados from "../services/llamados";
import "../styles/RegisterComponent.css";

function RegisterComponent() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [contraUsuario, setContraUsuario] = useState("");
  const [recibirPromociones, setRecibirPromociones] = useState(false);

  function cargar() {
    let usuario = {
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      correo: correoUsuario,
      contrasena: contraUsuario,
      promociones: recibirPromociones,
    };

    llamados
      .PostData(usuario, "users")
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <Box className="register-container">
      <Lock className="lock-icon" />
      <Typography variant="h5" className="title">
        Regístrate
      </Typography>

      <Box component="form" className="form">
        <Box className="name-fields">
          <FormControl className="input-field">
            <FormLabel>Nombre</FormLabel>
            <Input
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              fullWidth
            />
          </FormControl>

          <FormControl className="input-field">
            <FormLabel>Apellido</FormLabel>
            <Input
              value={apellidoUsuario}
              onChange={(e) => setApellidoUsuario(e.target.value)}
              required
              fullWidth
            />
          </FormControl>
        </Box>

        <FormControl className="input-field">
          <FormLabel>Correo Electrónico</FormLabel>
          <Input
            type="email"
            value={correoUsuario}
            onChange={(e) => setCorreoUsuario(e.target.value)}
            required
            fullWidth
          />
        </FormControl>

        <FormControl className="input-field">
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            value={contraUsuario}
            onChange={(e) => setContraUsuario(e.target.value)}
            required
            fullWidth
          />
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={recibirPromociones}
              onChange={(e) => setRecibirPromociones(e.target.checked)}
            />
          }
          label="Quiero recibir promociones y actualizaciones por correo electrónico."
        />
        <button className="btn-registrar" onClick={cargar}>
          REGÍSTRATE
        </button>

        <Typography variant="body2" className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterComponent;
