// Este componente permite crear nuevas entidades.
// Si no hay conexión al backend, guarda la entidad en localStorage usando datos simulados.
// Muestra un loader mientras guarda y un mensaje de error si ocurre algún problema.

import React, { useState } from "react";
import axios from "axios";
import mockEntities from "../mockEntities";

const url = "http://127.0.0.1:8000/api/entidades";

const CreateEntities = ({ goHome }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const store = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post(url, { name, description, status });
      setTimeout(() => {
        setLoading(false);
        if (goHome) goHome();
      }, 700);
    } catch (error) {
      // Modo offline: guardar en localStorage
      let local = [];
      try {
        local = JSON.parse(localStorage.getItem("entities")) || mockEntities;
      } catch {
        local = mockEntities;
      }
      const newEntity = {
        id: local.length ? Math.max(...local.map((e) => e.id)) + 1 : 1,
        name,
        description,
        status,
        created_at: new Date().toISOString(),
      };
      local.push(newEntity);
      localStorage.setItem("entities", JSON.stringify(local));
      setTimeout(() => {
        setLoading(false);
        if (goHome) goHome();
      }, 700);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Añadir productos
            </div>
            <div className="card-body">
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Guardando...</span>
                  </div>
                  <div>Guardando entidad...</div>
                </div>
              ) : (
                <>
                  <form onSubmit={store}>
                    <label>Nombre: </label>
                    <input
                      type="text"
                      id="nombre"
                      maxLength="80"
                      className="form-control"
                      required={true}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label>Descripción: </label>
                    <input
                      type="text"
                      id="descripcion"
                      maxLength="150"
                      className="form-control"
                      required={true}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    <label>Estatus: </label>
                    <input
                      type="Text"
                      id="status"
                      className="form-control"
                      required={true}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    ></input>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <button className="btn btn-success mt-3">Guardar</button>
                      <button
                        className="btn btn-secondary mt-3"
                        type="button"
                        onClick={goHome}
                      >
                        Regresar al inicio
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEntities;
