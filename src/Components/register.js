import axios from "axios";
import React, {useState, useContext} from "react";
import { useHistory } from "react-router";
import { userContext } from "./../Context/userContext";
import {url} from "./../setURL"

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
            history.push('/Products');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return ( 
        <div>
            <div>
                <h1>Tienda Libre!</h1>
                <p>Ingrese los siguientes datos!</p>
                <input onChange={(e)=>{setUsername(e.target.value)}} placeholder='Usuario'></input>
                <input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Contraseña'></input>
                <input onChange={(e)=>{setNombre(e.target.value)}} placeholder='Nombre'></input>
                <input onChange={(e)=>{setApellido(e.target.value)}} placeholder='Apellido'></input>
                <button onClick={()=>{registerUser()}}>Registrarse</button>
                <button onClick={()=>{history.push('/')}}>Volver</button>
            </div>
        </div>
     );
}
 
export default Register;