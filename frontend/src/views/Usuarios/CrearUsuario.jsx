import React, { useState } from "react";
import { useNavigate  } from "react-router";
import { createUser } from "../../repositorios/user";
import "../../css/form.css";
export default function Create() {
	const history = useNavigate ();

	const [state, setstate] = useState({});
	
    const submitForm = async (e) => {
		e.preventDefault();
		try {
			console.log(e.Email);
			const response = await createUser(state);
			alert("User created successfully:\n" + JSON.stringify(response, null, 2));
			history(`/users`);
		} catch (error) {
			console.log(error);
			alert("Error creando el usuario: " + error.message);
		}
	};
	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre</label>
					<input
						className="form-control"
						id="nombre"
						type="text"
						value={state.Name}
						onChange={(e) => {
							setstate({ ...state, Name: e.target.value });
						}}
						placeholder="Ingrese Nombre"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Apellido">Apellido</label>
					<input
						className="form-control"
						id="apellido"
						type="text"
						value={state.Lastname}
						onChange={(e) => {
							setstate({ ...state, Lastname: e.target.value });
						}}
						placeholder="Ingrese Nombre"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						id="email"
						type="email"
						value={state.Email}
						onChange={(e) => {
							setstate({ ...state, Email: e.target.value });
						}}
						placeholder="Ingrese Email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="Type">Tipo:</label>
					<select
						className="form-control"
						id="Type"
						value={state.Type}
						onChange={(e) => setstate({ ...state, Type: e.target.value })}
						required
					>
						<option value="">Seleccione un tipo</option>
						<option value="Admin">Admin</option>
						<option value="User">User</option>
						<option value="Moderator">Moderator</option>
					</select>
				</div>
				<div>
					<label htmlFor="Type">Password: 
					<input
						type="password"
						id="password"
						value={state.Password}
						onChange={(e) => {
							setstate({ ...state, Password: e.target.value });
						}}
					/> 
					</label>
				</div>
				<div className="float-right">
					<button type="submit" className="btn-primary-form">
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
}
