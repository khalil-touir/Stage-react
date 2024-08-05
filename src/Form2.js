import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form2.css";

const Form2 = () => {
  const [formData, setFormData] = useState({
    niveau: "",
    moyenneBac: "",
    siblingSESAME: "",
    previousSESAME: "",
    paymentMode: "",
    paymentMethod: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Formulaire REMISE</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="niveau" className="form-label">
            Niveau
          </label>
          <select
            className="form-select"
            id="niveau"
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="moyenneBac" className="form-label">
            Moyenne Bac
          </label>
          <input
            type="text"
            className="form-control"
            id="moyenneBac"
            name="moyenneBac"
            value={formData.moyenneBac}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Avez-vous un frère ou sœur qui étudie actuellement à SESAME?
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="siblingSESAME"
              id="siblingYes"
              value="yes"
              onChange={handleChange}
              checked={formData.siblingSESAME === "yes"}
            />
            <label className="form-check-label" htmlFor="siblingYes">
              Oui
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="siblingSESAME"
              id="siblingNo"
              value="no"
              onChange={handleChange}
              checked={formData.siblingSESAME === "no"}
            />
            <label className="form-check-label" htmlFor="siblingNo">
              Non
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Avez-vous déjà étudié à SESAME? (si oui, quel cursus?)
          </label>
          <input
            type="text"
            className="form-control"
            id="previousSESAME"
            name="previousSESAME"
            value={formData.previousSESAME}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentMode" className="form-label">
            Quelle est votre modalité de paiement souhaitée?
          </label>
          <select
            className="form-select"
            id="paymentMode"
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            <option value="mensuel">Mensuel</option>
            <option value="trimestriel">Trimestriel</option>
            <option value="annuel">Annuel</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Quel est votre mode de paiement souhaité?
          </label>
          <select
            className="form-select"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Choisir...</option>
            <option value="cheque">Chèque</option>
            <option value="virement">Virement bancaire</option>
            <option value="carte">Carte bancaire</option>
          </select>
        </div>
        <center>
          <button type="submit" className="btn btn-primary">
            Soumettre
          </button>
        </center>
      </form>
    </div>
  );
};

export default Form2;
