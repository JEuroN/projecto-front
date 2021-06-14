import React, {useContext, useState, useEffect} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { userContext } from "../Context/userContext";
import {url} from '../setURL';

const AddProduct = () => {

    const {session} = useContext(userContext);

    const history = useHistory();

    const [product, setProduct] = useState({
        product_handle: '',
        product_title: '',
        product_description: '',
        product_sku: '',
        product_grams: '',
        product_stock: '',
        product_price: '',
        product_compare_price: '',
        product_barcode: ''
    })
    
    const [error, setError] = useState(false);

    useEffect(()=>{
        axios(url+'/user/checkToken', {
            method: 'POST',
            data: {token: session},
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            console.log('Auth user!')
        })
        .catch((err)=>{
            history.push('/');
        })
    }, [])

    const createProduct = () => {
        console.log(product);
        axios(url+'/product/', {
            method: 'POST',
            data: product,
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            console.log(r);
            history.push('/product')
        })
        .catch((err)=>{
            console.log(err);
            setError(true);
        })
    }


    return ( 
        <div>
            <div>
                <button onClick={()=>{history.push('/product')}}>Volver</button>
                <button onClick={createProduct}>Crear</button>
            </div>
            <div>
                <span>Titulo: </span><input onChange={(e)=>{setProduct({...product, product_title: e.target.value})}} placeholder='Titulo'></input>
                <span>Etiqueta: </span><input onChange={(e)=>{setProduct({...product, product_handle: e.target.value})}}placeholder='Etiqueta'></input>
            </div>
            <div>
                <p><strong>Características:</strong></p>
                <textarea onChange={(e)=>{setProduct({...product, product_description: e.target.value})}} placeholder='Descripcion'></textarea>
            </div>
            <div>
                precio:   gramos:   stock:  
            </div>
            <div>
                <input type='number' onChange={(e)=>{setProduct({...product, product_price: e.target.value})}} placeholder='Precio'></input>  
                <input type='number' onChange={(e)=>{setProduct({...product, product_grams: e.target.value})}} placeholder='Gramos'></input>   
                <input type='number' onChange={(e)=>{setProduct({...product, product_stock: e.target.value})}} placeholder='Stock'></input>
            </div>
            <div>
                SKU:  Barcode:  Precio en comparacion:
            </div>
            <div>
                <input type='number' onChange={(e)=>{setProduct({...product, product_sku: e.target.value})}} placeholder='SKU'></input>  
                <input type='number' onChange={(e)=>{setProduct({...product, product_barcode: e.target.value})}} placeholder='Codigo de barras'></input>   
                <input type='number' onChange={(e)=>{setProduct({...product, product_compare_price: e.target.value})}} placeholder='Precio en comparacion'></input>
            </div>
            {error ? <h2>Se ha producido un error</h2> : null}
        </div>
     );
}
 
export default AddProduct;