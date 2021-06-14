import axios from "axios";
import React, {useState, useContext} from "react";
import { useHistory } from "react-router";
import { userContext } from "./../Context/userContext";
import {url} from "./../setURL"
import '../App.css'

const Register = () => {

    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const {setSession} = useContext(userContext);

    const registerUser = () =>{
        axios(url+'/user/Register',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            data: {
                user_username: username,
                user_password: password,
                user_firstname: nombre,
                user_lastname: apellido
            }
        })
        .then((r)=>{
            setSession(r.data.msg);
            history.push('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return ( 
            <div className='container-fluid resize'>
                <h1>Tienda Libre!</h1>
                <p>Ingrese los siguientes datos!</p>
                <div className='center-div'>
                    <label for="username" className="form-label">Usuario</label>
                    <input id='username' className='form-control' onChange={(e)=>{setUsername(e.target.value)}} placeholder='Usuario'></input>
                    <label for="password" className="form-label">Contraseña</label>
                    <input id='password'className='form-control' type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Contraseña'></input>
                    <label for="nombre" className="form-label">Nombre</label>
                    <input id='nombre' className='form-control' onChange={(e)=>{setNombre(e.target.value)}} placeholder='Nombre'></input>
                    <label for="apellido" className="form-label">Apellido</label>
                    <input id='apellido' className='form-control' onChange={(e)=>{setApellido(e.target.value)}} placeholder='Apellido'></input>
                </div>
                <div className='button-div'>
                    <button className='btn btn-primary' onClick={()=>{registerUser()}}>Registrarse</button>
                    <button className='btn btn-primary' onClick={()=>{history.push('/')}}>Volver</button>
                </div>
            </div>
     );
}
 
export default Register;