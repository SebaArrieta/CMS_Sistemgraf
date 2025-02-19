import React from "react";
/*import useSWR from "swr";*/

import { useParams } from "react-router";
import { getUser } from "../../repositorios/user";

import "../../css/form.css";
export default function Show() {
	const { id } = useParams();
    /*
	const { data, error } = useSWR(id, {
		fetcher: getUser,
		initialData: [],
		revalidateOnMount: true,
	});
*/
    const users = [
        { id: 1, nombre: "John Doe", email: "john@example.com" },
        { id: 2, nombre: "Jane Smith", email: "jane@example.com" },
        { id: 3, nombre: "Alice Johnson", email: "alice@example.com" },
    ];
    const user = users.find((u) => u.id === Number(id));

	// If user is not found
	if (!user) {
		return <div className="container"><h2>Usuario no encontrado</h2></div>;
	}
	return (
		<div className="container">
			<table className="table">
				<tbody>
					<tr>
						<th>ID:</th>
						<td>{user.id}</td>
					</tr>
					<tr>
						<th>Nombre</th>
						<td>{user.nombre}</td>
					</tr>
					<tr>
						<th>Email</th>
						<td>{user.email}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
