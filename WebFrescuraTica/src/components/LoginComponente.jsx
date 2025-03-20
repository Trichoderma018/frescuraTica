import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Checkbox, FormControl, FormLabel, FormControlLabel, Box, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import llamados from "../services/llamados";
import "../styles/LoginComponente.css";

function LoginComponente() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contraUsuario, setContraUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataUsers() {
            const datos = await llamados.GetData("users");
            setUsuarios(datos);
        }
        fetchDataUsers();
    }, []);

    function validar() {
        const encontrado = usuarios.find(
            (usuario) => usuario.nombre === nombreUsuario && usuario.contrasena === contraUsuario
        );

        if (!encontrado) {
            console.log("Usuario o contraseña incorrectos");
        } else {
            navigate("/");
        }
    }

    return (
        <Box className="login-container">
            <Lock className="lock-icon" />
            <Typography variant="h5" className="title">Iniciar sesión</Typography>
            
            <Box component="form" className="form">
                <FormControl className="input-field">
                    <FormLabel>Nombre</FormLabel>
                    <Input 
                        type="email"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                        className="input"
                    />
                </FormControl>

                <FormControl className="input-field">
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                        type="password"
                        value={contraUsuario}
                        onChange={(e) => setContraUsuario(e.target.value)}
                        required
                        className="input"
                    />
                </FormControl>

                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Recuérdame"
                    className="checkbox"
                />
                <button className="login-button" onClick={validar}>
                    INICIAR SESIÓN
                </button>
            </Box>

            <Typography variant="body2" className="register-link">
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </Typography>
        </Box>
    );
}

export default LoginComponente;
