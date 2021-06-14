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
        <div>
            <button onClick={()=>{history.push('/')}}>Volver</button>
            <div>
                <h1>Has olvidado tu contraseña?</h1>
                <input onChange={(e)=>{setUser(e.target.value)}} placeholder='Usuario' ></input>
                <input onChange={(e)=>{setFirstname(e.target.value)}} placeholder='Nombre' ></input>
                <input onChange={(e)=>{setLastname(e.target.value)}} placeholder='Apellido' ></input>
                <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Nueva contraseña' ></input>
                <button onClick={changePassword}>Cambiar contraseña</button>
                {error ? <h2>Se ha producido un error</h2> : null}
            </div>
        </div>
     );
}
 
export default Recuperar;