import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import { url } from "../setURL";

const Recuperar = () => {

    const history = useHistory()

    const [user, setUser] = useState('');
    
    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const changePassword = () => {
        console.log(user, firstname, lastname, password);
        console.log(user, firstname, lastname);
            axios(url + '/user/', {
                method: 'PUT',
                data: {
                    user_username: user,
                    user_firstname: firstname,
                    user_lastname: lastname,
                    user_password: password
                }
            })
            .then((r)=>{
                history.push('/');
            })
            .catch((err)=>{
                console.log(err);
                setError(true);
            })
    }

    return ( 
            <div className='container-fluid resize'>
                <h1>Has olvidado tu contraseña?</h1>
                <div className='center-div'>
                    <label for="username" className="form-label">Usuario</label>
                    <input id='username' className='form-control' onChange={(e)=>{setUser(e.target.value)}} placeholder='Usuario' ></input>
                    <label for="nombre" className="form-label">Nombre</label>
                    <input id='nombre' className='form-control' onChange={(e)=>{setFirstname(e.target.value)}} placeholder='Nombre' ></input>
                    <label for="apellido" className="form-label">Apellido</label>
                    <input id='apellido' className='form-control' onChange={(e)=>{setLastname(e.target.value)}} placeholder='Apellido' ></input>
                    <label for="password" className="form-label">Nueva contraseña</label>
                    <input id='password'className='form-control'  onChange={(e)=>{setPassword(e.target.value)}} placeholder='Nueva contraseña' ></input>
                </div>
                <div className='button-div'>
                    <button className='btn btn-primary' onClick={changePassword}>Cambiar contraseña</button>
                    <button className='btn btn-primary' onClick={()=>{history.push('/')}}>Volver</button>
                </div>
                {error ? <h2>Se ha producido un error</h2> : null}
            </div>
     );
}
 
export default Recuperar;