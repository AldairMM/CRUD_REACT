import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://127.0.0.1:8000/api/entidades/";

const EditEntities = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const options = { headers: { "Content-Type": "application/json" } };
      try {
        const respuesta = await axios.get(url + id, options);
        setName(respuesta.data.entity.name);
        setDescription(respuesta.data.entity.description);
        setStatus(respuesta.data.entity.status);
      } catch (error) {
        let msg = "Error al cargar la entidad";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          msg = error.response.data.message;
        }
        setErrorMsg(msg);
      }
    };
    getProduct();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.put(url + id, { id, name, description, status });
      redirect("/");
    } catch (error) {
      let msg = "Error al guardar la entidad";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        msg = error.response.data.message;
      }
      setErrorMsg(msg);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Editar productos
            </div>
            <div className="card-body">
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
                <form onSubmit={update}>
                  <label>Nombre: </label>
                  <input type='text' id='nombre' maxLength='80'
                    className="form-control"
                    required={true} value={name} onChange={(e) => setName(e.target.value)}>
                  </input>
                  <label>Descripción: </label>
                  <input type='text' id='descripcion' maxLength='150'
                    className="form-control"
                    required={true} value={description} onChange={(e) => setDescription(e.target.value)}>
                  </input>
                  <label>Precio: </label>
                  <input type='text' id='status'
                    className="form-control"
                    required={true} value={status} onChange={(e) => setStatus(e.target.value)}>
                  </input>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <button className="btn btn-success mt-3">Guardar</button>
                    <button className="btn btn-secondary mt-3" type="button" onClick={() => redirect('/')}>Regresar al inicio</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEntities;
