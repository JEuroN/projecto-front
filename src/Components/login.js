import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import {url} from '../setURL'
import { userContext } from '../Context/userContext';

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
            <div>
                <h1>Tienda libre!</h1>
                <p>Ingresa tus datos para ingresar!</p>
                <input placeholder='Usuario' onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input placeholder='Contraseña' type='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button onClick={login}>Ingresar</button>
                <button onClick={()=>{history.push('/registro')}}>Registro</button>
                <button onClick={()=>{history.push('/recuperar')}}>Olvide mi contraseña</button>
                {error ? <p>Contraseña incorrecta</p> : null }
            </div>
        </div>
     );
}
 
export default Login;