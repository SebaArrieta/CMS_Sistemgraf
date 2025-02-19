import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getUsers } from "../../repositorios/user";
import "../../css/form.css";
import UserAdd from "./CrearUsuario";
export default function UserCRUD() {
    const [view, setView] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedUser = users.find((u) => u.id === Number(id));

    const [formState, setFormState] = useState({ nombre: "", email: "", password: "", tipo: "User" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    // Function to create or update a user
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formState.id) {
            // Update existing user
            setUsers(users.map((u) => (u.id === formState.id ? formState : u)));
        } else {
            // Create new user
            setUsers([...users, { ...formState, id: users.length + 1 }]);
        }
        navigate("/users");
    };

    // Function to delete a user
    const handleDelete = (id) => {
        setUsers(users.filter((u) => u.id !== id));
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Usuarios</h2>

            {/* List Users */}
            
            {!id && (
                <>
                    {!view ? (
                        <button 
                            onClick={() => setView(true)} 
                            className="btn-primary-form"
                        >
                            Crear Usuario
                        </button>
                    ) : (
                        <UserAdd />
                    )}
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.ID}>
                                    <td>{user.ID}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Type}</td>
                                    <td>
                                        <button onClick={() => navigate(`/users/${user.ID}`)} className="btn btn-info">Ver</button>
                                        <button onClick={() => setFormState(user)} className="btn btn-warning mx-2">Editar</button>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Show a User */}
            {id && selectedUser && (
                <div>
                    <h3>Detalles del Usuario</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>ID:</th>
                                <td>{selectedUser.id}</td>
                            </tr>
                            <tr>
                                <th>Nombre:</th>
                                <td>{selectedUser.nombre}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{selectedUser.email}</td>
                            </tr>
                            <tr>
                                <th>Tipo:</th>
                                <td>{selectedUser.tipo}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => navigate("/users")} className="btn btn-secondary">Volver</button>
                </div>
            )}

            {/* Create or Edit a User */}
            {(id === "create" || formState.id) && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <h3>{formState.id ? "Editar Usuario" : "Crear Usuario"}</h3>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            value={formState.nombre}
                            onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                            placeholder="Ingrese Nombre"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="Ingrese Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={formState.password}
                            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Usuario</label>
                        <select
                            className="form-control"
                            value={formState.tipo}
                            onChange={(e) => setFormState({ ...formState, tipo: e.target.value })}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary-form mt-3">
                        {formState.id ? "Actualizar" : "Guardar"}
                    </button>
                    <button type="button" onClick={() => navigate("/users")} className="btn btn-secondary mx-2">Cancelar</button>
                </form>
            )}
        </div>
    );
}
