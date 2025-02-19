import React, { useState, useEffect } from "react";
import { getUsers } from "../../repositorios/user";

export default function UsersList() {
    const [users, setUsers] = useState([]);

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
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="container mt-4">
            <h2>Lista de Usuarios</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}