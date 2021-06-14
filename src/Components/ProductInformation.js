import React, {useContext, useEffect, useState} from "react";
import { userContext } from "../Context/userContext";
import axios from 'axios';
import { useHistory } from "react-router";
import {url} from './../setURL';
import parse from 'html-react-parser';
import Modal from 'react-modal'

const ProductInformation = () => {

    const {session} = useContext(userContext);

    const history = useHistory();

    const [producto, setProducto] = useState([]);

    const [newProduct, setNewProduct] = useState({
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

    const [isOpen, setIsOpen] = useState(false);

    const buscarProducto = () => {
        axios(url+window.location.pathname, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((r)=>{
            setProducto({...r.data.msg[0], product_description: parse(r.data.msg[0].product_description)});
            setNewProduct({...r.data.msg[0]});
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
        console.log(window.location.pathname)
        axios(url + window.location.pathname, {
            method: 'DELETE'
        })
        .then((r)=>{
            history.push('/product');
        })
        .catch((err)=>{
            setError(true);
        })
    }

    const actualizar = () => {
        setIsOpen(false);
        axios(url+window.location.pathname, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            data: newProduct
        })
        .then((r)=>{
            console.log(r);
            setProducto({...newProduct, product_description: parse(newProduct.product_description)});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return ( 
        <div>
            <button onClick={()=>{history.push('/product')}}>Volver</button>
            <button onClick={()=>{eliminar()}}>Eliminar</button>
            <button onClick={()=>{setIsOpen(!isOpen)}}>Actualizar</button>
            <div>
                <h1>{producto.product_title}</h1>
                <h2>{producto.product_handle}</h2>
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
            {error ? <h2>se ha producido un error</h2> : null}
            <Modal isOpen={isOpen} ariaHideApp={false}>
                <div>
                    <div>
                        <button onClick={()=>{setIsOpen(!isOpen)}}>Cerrar</button>
                        <button onClick={()=>{actualizar()}}>Guardar</button>
                    </div>
                    <div>
                        <input onChange={(e)=>{setNewProduct({...newProduct, product_title: e.target.value})}} value={newProduct.product_title}></input>
                        <input onChange={(e)=>{setNewProduct({...newProduct, product_handle: e.target.value})}} value={newProduct.product_handle}></input>
                    </div>
                    <div>
                        <textarea onChange={(e)=>{setNewProduct({...newProduct, product_description: e.target.value})}} value={newProduct.product_description}></textarea>
                    </div>
                    <div>
                        precio:   gramos:   stock:  
                    </div>
                    <div>
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_price: e.target.value})}} value={newProduct.product_price}></input>  
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_grams: e.target.value})}} value={newProduct.product_grams}></input>   
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_stock: e.target.value})}} value={newProduct.product_stock}></input>
                    </div>
                    <div>
                        SKU:   Barcode:   Precio en comparacion:
                    </div>
                    <div>
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_sku: e.target.value})}} value={newProduct.product_sku}></input>   
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_barcode: e.target.value})}} value={newProduct.product_barcode}></input>
                        <input type='number' onChange={(e)=>{setNewProduct({...newProduct, product_compare_price: e.target.value})}} value={newProduct.product_compare_price}></input>
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default ProductInformation;