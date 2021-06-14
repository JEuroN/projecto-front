import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import {url} from '../setURL'
import { userContext } from '../Context/userContext';
import '../App.css'

const Login = () => {

    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const history = useHistory();

    const {setSession} = useContext(userContext);

    useEffect(() => {
        setSession('');
    }, [])

    const login = () => {

        console.log(username, password);

        axios(url+'/user/Login',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            data: {
                user_username: username,
                user_password: password
            }
        })
        .then((r)=>{
            setSession(r.data.msg);
            history.push('/product');
        })
        .catch((err)=>{
            console.log(err);
            setError(true);
        })
    }
    
    return ( 
        <div>
            <div className='container-fluid resize'>
                <h1>Tienda libre!</h1>
                <p>Ingresa tus datos para ingresar!</p>
                <div className='center-div'>
                    <label for="username" className="form-label">Usuario</label>
                    <input className="form-control" id='username' placeholder='Usuario' onChange={(e)=>{setUsername(e.target.value)}}></input>
                    <label for="password" className="form-label">Contraseña</label>
                    <input className="form-control" id='password' placeholder='Contraseña' type='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div className='button-div'>
                    <button className='btn btn-primary' onClick={login}>Ingresar</button>
                    <p onClick={()=>{history.push('/registro')}}>Registro</p>
                    <p onClick={()=>{history.push('/recuperar')}}>Olvide mi contraseña</p>
                    {error ? <p>Contraseña incorrecta</p> : null }
                </div>
            </div>
        </div>
     );
}
 
export default Login;