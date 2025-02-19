import axios from "axios";
const createUser = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/users`, data);
const getUser = (id) =>
    axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
        .then((res) => res.data);
export {createUser, getUser}