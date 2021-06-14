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
        <div className='center-div'>
            <div>
                <button className='btn btn-primary' onClick={()=>{history.push('/product')}}>Volver</button>
                <button className='btn btn-primary' onClick={createProduct}>Crear</button>
            </div>
            <div className='reduce'>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_title: e.target.value})}} type="text" value={product.product_title} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Titulo: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_handle: e.target.value})}} type="text" value={product.product_handle} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Handle: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_price: e.target.value})}} type="text" value={product.product_price} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Precio: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_grams: e.target.value})}} type="text" value={product.product_grams} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Grams: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_stock: e.target.value})}} type="text" value={product.product_stock} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Stock:</label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_sku: e.target.value})}} type="text" value={product.product_sku} placeholder="Disabled input" aria-label="Disabled input example"/>            
                <label for="floatingInput">SKU: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_compare_price: e.target.value})}} type="text" value={product.product_compare_price} placeholder="Disabled input" aria-label="Disabled input example" />            
                <label for="floatingInput">Compare: </label>
            </div>
            <div class="form-floating">
                <input class="form-control" onChange={(e)=>{setProduct({...product, product_barcode: e.target.value})}} type="text" value={product.product_barcode} placeholder="Disabled input" aria-label="Disabled input example"/>            
                <label for="floatingInput">Barcode: </label>
            </div>
            <div>
                <p><strong>Características:</strong></p>
                <textarea className='form-control' onChange={(e)=>{setProduct({...product, product_description: e.target.value})}} placeholder='Descripcion'></textarea>
            </div>
            </div>
            {error ? <h2>Se ha producido un error</h2> : null}
        </div>
     );
}
 
export default AddProduct;