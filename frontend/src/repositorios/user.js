import axios from "axios";
const createUser = async (data) =>{
    const response = await axios.post(`http://localhost:5000/create`, data);
    return response.data;
  };
const getUsers = () =>
    axios
        .get(`http://localhost:5000/getUsers`)
        .then((res) => res.data);
const getUser = (id) =>
    axios
        .get(`http://localhost:5000/getUser`)
        .then((res) => res.data);
const login = async (data) =>
    axios
        .post(`http://localhost:5000/login`, data)
        .then((res) => res.data);
const deleteUser = async (id) =>
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`).then(res => res.data);

export {createUser, getUsers, getUser,login, deleteUser }