import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://127.0.0.1:8000/api/entidades/";

const EditEntities = () => {
    const[name, setName]= useState('');
    const[description, setDescription]= useState('');
    const[status, setStatus]= useState('');
    const {id} = useParams();
    const redirect = useNavigate();
    

    useEffect( () =>{
        const getProduct = async() =>{
            const options = {headers: {'Content-Type': 'application/json'}};
            const respuesta = await axios.get(url + id,options);
            setName(respuesta.data.entity.name);
            setDescription(respuesta.data.entity.description);
            setStatus(respuesta.data.entity.status);
        }
        getProduct();
    },[]);

    const update = async(e) =>{
        e.preventDefault();
        await axios.put(url+id,{id:id,name:name,description:description,status:status});
        redirect('/');
    }

  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Editar productos</div>
                    <div className="card-body">
                        <form onSubmit={update}>
                            <label>Nombre: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                            required={true} value={name} onChange={ (e) => setName(e.target.value)}>
                            </input>
                            <label>Descripción: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                            required={true} value={description} onChange={ (e) => setDescription(e.target.value)}>
                            </input>
                            <label>Precio: </label>
                            <input type='text' id='status' 
                            className="form-control"
                            required={true} value={status} onChange={ (e) => setStatus(e.target.value)}>
                            </input>
                            <button className="btn btn-success mt-3">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditEntities
