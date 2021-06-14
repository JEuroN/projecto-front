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
            <div>
                <h2>{producto.product_title}</h2>
                <h3>{producto.product_handle}</h3>
            </div>
            <div className="form-floating">
                <input className="form-control  no-padding" type="text" value={producto.product_price} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">Precio: </label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="text" value={producto.product_grams} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">Grams: </label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="text" value={producto.product_stock} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">Stock:</label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="text" value={producto.product_sku} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">SKU: </label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="text" value={producto.product_compare_price} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">Compare: </label>
            </div>
            <div className="form-floating">
                <input className="form-control" type="text" value={producto.product_barcode} placeholder="Disabled input" aria-label="Disabled input example" disabled />            
                <label for="floatingInput">Barcode: </label>
            </div>
            <div>
                {producto.product_description}
            </div>

            {error ? <h2>se ha producido un error</h2> : null}

            <div >
                <button className='btn btn-primary' onClick={()=>{history.push('/product')}}>Volver</button>
                <button className='btn btn-primary' onClick={()=>{eliminar()}}>Eliminar</button>
                <button className='btn btn-primary' onClick={()=>{setIsOpen(!isOpen)}}>Actualizar</button>
            </div>

            <Modal isOpen={isOpen} ariaHideApp={false} style={{content:{inset: '10px'}}}>
                <div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_title: e.target.value})}} type="text" value={newProduct.product_title} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Titulo: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_handle: e.target.value})}} type="text" value={newProduct.product_handle} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Handle: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_price: e.target.value})}} type="text" value={newProduct.product_price} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Precio: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_grams: e.target.value})}} type="text" value={newProduct.product_grams} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Grams: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_stock: e.target.value})}} type="text" value={newProduct.product_stock} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Stock: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_sku: e.target.value})}} type="text" value={newProduct.product_sku} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">SKU: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_compare_price: e.target.value})}} type="text" value={newProduct.product_compare_price} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Compare: </label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" onChange={(e)=>{setNewProduct({...newProduct, product_barcode: e.target.value})}} type="text" value={newProduct.product_barcode} placeholder="Disabled input" aria-label="Disabled input example" />            
                        <label for="floatingInput">Barcode: </label>
                    </div>
                    <div>
                        <p><strong>Características:</strong></p>
                        <textarea className='form-control' onChange={(e)=>{setNewProduct({...newProduct, product_description: e.target.value})}} value={newProduct.product_description} placeholder='Descripcion'></textarea>
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={()=>{setIsOpen(!isOpen)}}>Cerrar</button>
                        <button className='btn btn-primary' onClick={()=>{actualizar()}}>Guardar</button>
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default ProductInformation;