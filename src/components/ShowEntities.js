import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "http://127.0.0.1:8000/api/entidades";

const ShowEntities = () => {
  const [entities, setEntities] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getEntities();
    // eslint-disable-next-line
  }, [statusFilter]); 

  useEffect(() => {
    getEntities();
    // eslint-disable-next-line
  }, []);

  const getEntities = async () => {
    try {
      const endpoint = statusFilter ? `${url}/status/${statusFilter}` : url;
      const respuesta = await axios.get(endpoint);
      setEntities(respuesta.data);
    } catch (error) {
      console.error("Error cargando entidades:", error);
    }
  };
  const deleteEntites = async (id) => {
    const params = { headers: { "Content-Type": "application/json" } };
    await axios.delete(url + "/" + id, params);
    getEntities();
  };
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        {/* 
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <Link to='/create' className="btn btn-dark">Añadir</Link>
                    </div>
                </div> */}
      </div>
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Estatus</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {entities.map((entity, i) => (
                  <tr key={entity.id}>
                    <td>{entity.id}</td>
                    <td>{entity.name}</td>
                    <td>{entity.description}</td>
                    <td>{entity.status}</td>
                    <td>
                      <Link
                        to={`/edit/${entity.id}`}
                        className="btn btn-warning"
                      >
                        Editar
                      </Link>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteEntites(entity.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEntities
