import React, {useContext, useState, useEffect} from "react";
import { userContext } from "../Context/userContext";
import { useHistory } from "react-router";
import axios from 'axios';
import {url} from './../setURL'
import '../App.css'

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
        <tr key={product_id} onClick={()=>{seeProduct(product_id)}}>
            <td>
                {product_barcode}
            </td>
            <td>
                {product_title}
            </td>
            <td>
                {product_stock}
            </td>
            <td>
                {product_price}
            </td>
        </tr>
        )
    })

    const search = products.map((item)=>{
        const {product_title, product_stock, product_price, product_barcode, product_id} = item;
        
        if(product_title.toLowerCase().includes(filter.toLowerCase())){
            return(
            <tr key={product_id} onClick={()=>{seeProduct(product_id)}}>
                <td>
                    {product_barcode}
                </td>
                <td>
                    {product_title}
                </td>
                <td>
                    {product_stock}
                </td>
                <td>
                    {product_price}
                </td>
            </tr>
            )
        }else {return null}
    })

    return ( 
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid center">
                    <form className="d-flex">
                    <input onChange={(e)=>{setFilter(e.target.value)}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <div className='table-div'>
                <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="col">Bar</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filter.length < 1 ? productRows : search}
                </tbody>
                </table>
            </div>
            <div className='div-btn'>
                <button className='btn btn-primary' onClick={()=>{history.push('/')}}>Volver</button>
                <button className='btn btn-primary' onClick={()=>{history.push('/create')}}>Añadir un producto</button>
            </div>
        </div>
     );
}
 
export default Products;