import React, {useContext, useEffect, useState} from "react";
import { userContext } from "../Context/userContext";
import axios from 'axios';
import { useHistory } from "react-router";
import {url} from './../setURL';
import parse from 'html-react-parser';

const ProductInformation = () => {

    const {session} = useContext(userContext);

    const history = useHistory();

    const [producto, setProducto] = useState([]);

    const buscarProducto = () => {
        axios(url+window.location.pathname, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            console.log(r);
            setProducto({...r.data.msg[0], product_description: parse(r.data.msg[0].product_description)})
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        axios(url+'/user/checkToken', {
            method: 'POST',
            data: {token: session},
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            buscarProducto();
        })
        .catch((err)=>{
            history.push('/');
        })
    }, [])

    const eliminar = () => {

    }

    const actualizar = () => {
        
    }

    return ( 
        <div>
            <button onClick={()=>{history.push('/product')}}>Volver</button>
            <button onClick={()=>{eliminar()}}>Eliminar</button>
            <button onClick={()=>{actualizar()}}>Actualizar</button>
            <div>
                <h1>{producto.product_title}</h1>
                <h2>{producto.handle}</h2>
            </div>
            <div>
                {producto.product_description}
            </div>
            <div>
                precio:  -  gramos:  -  stock:  
            </div>
            <div>
                {producto.product_price}  -  {producto.product_grams}  -  {producto.product_stock}
            </div>
            <div>
                SKU:  -  Barcode:  -  Precio en comparacion:
            </div>
            <div>
                {producto.product_sku}  -  {producto.product_barcode}  -  {producto.product_compare_price}
            </div>
        </div>
     );
}
 
export default ProductInformation;