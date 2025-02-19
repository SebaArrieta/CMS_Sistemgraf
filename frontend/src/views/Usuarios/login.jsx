import React, { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../repositorios/user";
import "../../css/form.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login( {Email:email, Password:password} );
            
            if (response.data.token) {
                localStorage.setItem("Token", response.data.token); // Guardar token de sesión
                localStorage.setItem("Tipo", response.data.tipo);
                navigate("/dashboard"); // Redirigir al dashboard
            } else {
                alert("Error: No se recibió un token.");
            }
        } catch (error) {
            alert("Error creando el usuario: " + error.message);
            alert("Error de autenticación: " + (error.response?.data?.message || "Credenciales incorrectas"));
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}