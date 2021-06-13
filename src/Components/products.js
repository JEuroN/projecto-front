import React, {useContext, useState, useEffect} from "react";
import { userContext } from "../Context/userContext";
import { useHistory } from "react-router";
import axios from 'axios';
import {url} from './../setURL'

const Products = () => {

    const history = useHistory();

    const [products, setProducts] = useState([]);

    const [filter, setFilter] = useState('');

    const {session} = useContext(userContext);

    useEffect(() => {
        axios(url+'/user/checkToken', {
            method: 'POST',
            data: {token: session},
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            getProducts();
        })
        .catch((err)=>{
            history.push('/');
        })
    }, [])

    const getProducts = () => {
        axios(url+'/product/', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            setProducts([...r.data.msg])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const seeProduct = (product_id) => {
        history.push(`/product/${product_id}`); 
    }

    const productRows = products.map((item)=>{
        const {product_title, product_stock, product_price, product_barcode, product_id} = item;
        
        return(
        <div key={product_id} onClick={()=>{seeProduct(product_id)}}>
            <div>
                <h1>{product_title}</h1>
            </div>
            <div>
                Stock: {product_stock} -
                Precio: {product_price} -
                Codigo de barra: {product_barcode}
            </div>
        </div>
        )
    })

    const search = products.map((item)=>{
        const {product_title, product_stock, product_price, product_barcode, product_id} = item;
        
        if(product_title.toLowerCase().includes(filter.toLowerCase())){
            return(
            <div key={product_id} onClick={()=>{seeProduct(product_id)}}>
                <div>
                    <h1>{product_title}</h1>
                </div>
                <div>
                    Stock: {product_stock} -
                    Precio: {product_price} -
                    Codigo de barra: {product_barcode}
                </div>
            </div>
            )
        }else {return null}
    })

    return ( 
        <div>
            <div>
                <button onClick={()=>{history.push('/')}}>Volver</button>
                <input placeholder='Buscar por nombre' onChange={(e)=>{setFilter(e.target.value)}}></input>
                <button onClick={()=>{history.push('/product/create')}}>Crear</button>
            </div>
            <div>
                {filter.length < 1 ? productRows : search}
            </div>
        </div>
     );
}
 
export default Products;