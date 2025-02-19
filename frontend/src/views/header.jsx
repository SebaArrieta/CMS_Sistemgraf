import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { Link } from 'react-router'; 
//import { useSelector } from 'react-redux'
import Logo  from '../images/Logo3.png'
//import Logout from '../views/users/Logout'

export default function Header() {
    //const nombre = useSelector((store => store.username));
    //const isAuthenticated = JSON.parse(sessionStorage.getItem('authToken'))
    return (
       <Navbar className="App-header">
            <Navbar.Brand href="/home">
                
            <div>  <img src={Logo} className="App-logo" /> </div>

            </Navbar.Brand>
            <Link to="/user" className="btn btn-primary">Usuarios</Link>
            <div className="text-white"> cosa</div>
            {/*isAuthenticated ? (<Logout />): (<></>)*/}
        </Navbar>
    )
}

