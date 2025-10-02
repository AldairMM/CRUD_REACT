import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../customTable.css";

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

const url = "http://127.0.0.1:8000/api/entidades";

const ShowEntities = () => {
  const [entities, setEntities] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState(null);

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

  const handleDeleteClick = (id) => {
    setEntityToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!entityToDelete) return;
    const params = { headers: { "Content-Type": "application/json" } };
    await axios.delete(url + "/" + entityToDelete, params);
    setShowModal(false);
    setEntityToDelete(null);
    getEntities();
  };

  const cancelDelete = () => {
    setShowModal(false);
    setEntityToDelete(null);
  };

  return (
    <>
      {/* Modal de confirmación */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h5>¿Seguro que deseas eliminar esta entidad?</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 d-flex flex-column align-items-center">
            <label
              htmlFor="statusFilter"
              style={{ fontWeight: 500, marginBottom: 8 }}
            >
              Filtrar por estatus
            </label>
            <select
              id="statusFilter"
              className="form-select"
              style={{ maxWidth: "700px", width: "100%" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="custom-table-card">
              <div className="custom-table-header">
                <span className="custom-table-title">
                  <span style={{ fontWeight: 700 }}>Entidades</span>
                </span>
              </div>
              <div className="table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Fecha de creación</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entities.map((entity, i) => (
                      <tr key={entity.id}>
                        <td>{entity.name}</td>
                        <td>{entity.description || "-"}</td>
                        <td>{entity.status || "-"}</td>
                        <td>{formatDate(entity.created_at)}</td>
                        <td>
                          <Link
                            to={`/edit/${entity.id}`}
                            className="custom-action-btn custom-edit-btn"
                            title="Editar"
                          >
                            <span role="img" aria-label="edit">
                              ✏️
                            </span>
                          </Link>
                          &nbsp;
                          <button
                            className="custom-action-btn custom-delete-btn"
                            title="Eliminar"
                            onClick={() => handleDeleteClick(entity.id)}
                          >
                            <span role="img" aria-label="delete">
                              🗑️
                            </span>
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
      </div>
    </>
  );
};

export default ShowEntities;
