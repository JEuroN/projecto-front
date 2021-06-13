import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from 'axios';

const Recuperar = () => {

    const history = useHistory()

    return ( 
        <div>
            <button onClick={()=>{history.push('/')}}>Volver</button>
        </div>
     );
}
 
export default Recuperar;