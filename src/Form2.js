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

  const [discounts, setDiscounts] = useState({
    paymentFull: false,
    sibling: false,
    partnerCompany: false,
    excellence16: false,
    excellence14: false,
    repeatYear: false,
    sesameGraduate: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setDiscounts((prev) => {
      const newDiscounts = { ...prev };
      if (name === "paymentMode") {
        newDiscounts.paymentFull = value === "full";
      }
      if (name === "siblingSESAME") {
        newDiscounts.sibling = value === "yes";
      }
      if (name === "moyenneBac") {
        const moyenne = parseFloat(value);
        newDiscounts.excellence16 = moyenne >= 16;
        newDiscounts.excellence14 = moyenne >= 14 && moyenne < 16;
      }
      // Add your logic for partner company, repeat year, and SESAME graduate if needed
      return newDiscounts;
    });
  };

  const calculateTotalAmount = () => {
    let baseAmount;
    switch (formData.niveau) {
      case "L1":
      case "L2":
      case "L3":
        baseAmount = 6420;
        break;
      case "Prep1":
      case "Prep2":
        baseAmount = 6955;
        break;
      case "ING1":
      case "ING2":
      case "ING3":
        baseAmount = 6955;
        break;
      case "M1":
      case "M2":
        baseAmount = 8560;
        break;
      default:
        baseAmount = 0;
        break;
    }

    // Apply discounts
    let discount = 0;
    let discountDescription = "";

    if (discounts.paymentFull) {
      discount = 0.05;
      discountDescription =
        "5% de remise en cas de paiement total à l'inscription";
    }
    if (discounts.sibling) {
      discount = 0.1;
      discountDescription =
        "10% de remise en cas de fratrie pour le 2ème inscrit";
    }
    if (discounts.excellence16) {
      discount = 0.2;
      discountDescription =
        "20% de remise accordée sous forme de bourse d'excellence aux étudiants classés premiers de leur niveau avec une moyenne générale supérieure à 16/20";
    }
    if (discounts.excellence14) {
      discount = 0.2;
      discountDescription =
        "20% de remise accordée sous forme de bourse d'excellence aux bacheliers avec une moyenne générale supérieure à 14/20";
    }
    if (discounts.repeatYear) {
      discount = 0.5;
      discountDescription =
        "50% de réduction en cas de redoublement de l'étudiant";
    }
    if (discounts.sesameGraduate) {
      discount = 0.1;
      discountDescription =
        "10% pour les diplômés de SÉSAME et qui s’inscrivent dans un autre parcours";
    }

    const discountedAmount = baseAmount * (1 - discount);

    return { baseAmount, discountedAmount, discountDescription };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { baseAmount, discountedAmount, discountDescription } =
      calculateTotalAmount();
    alert(
      `Le montant à payer est: ${discountedAmount.toFixed(
        2
      )} DT\nRemise: ${discountDescription}`
    );
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
            <option value="Prep1">Prep1</option>
            <option value="Prep2">Prep2</option>
            <option value="ING1">ING1</option>
            <option value="ING2">ING2</option>
            <option value="ING3">ING3</option>
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="studiedAtSESAME"
              id="studiedAtSESAMEYes"
              value="yes"
              onChange={handleChange}
              checked={formData.studiedAtSESAME === "yes"}
            />
            <label className="form-check-label" htmlFor="studiedAtSESAMEYes">
              Oui
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="studiedAtSESAME"
              id="studiedAtSESAMENo"
              value="no"
              onChange={handleChange}
              checked={formData.studiedAtSESAME === "no"}
            />
            <label className="form-check-label" htmlFor="studiedAtSESAMENo">
              Non
            </label>
          </div>
          {formData.studiedAtSESAME === "yes" && (
            <div className="mt-3">
              <label htmlFor="previousSESAME" className="form-label">
                Sélectionnez le cursus
              </label>
              <select
                className="form-select"
                id="previousSESAME"
                name="previousSESAME"
                value={formData.previousSESAME}
                onChange={handleChange}
                required
              >
                <option value="">Choisir...</option>
                <option value="Prep1">Prep1</option>
                <option value="Prep2">Prep2</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="ING1">ING1</option>
                <option value="ING2">ING2</option>
                <option value="ING3">ING3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
            </div>
          )}
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
            <option value="full">Paiement complet</option>
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

        {/* Displaying all possible discounts */}
        <div className="mb-3">
          <h5>Différentes Remises :</h5>
          <ul>
            <li>5% de remise en cas de paiement total à l'inscription</li>
            <li>10% de remise en cas de fratrie pour le 2ème inscrit</li>
            <li>
              7% de remise si l'un des parents de l'étudiant travaille dans une
              entreprise partenaire de l'université Sésame, avec laquelle une
              convention a été signée.
            </li>
            <li>
              20% de remise accordée sous forme de bourse d'excellence aux
              étudiants classés premiers de leur niveau avec une moyenne
              générale supérieure à 16/20.
            </li>
            <li>
              20% de remise accordée sous forme de bourse d'excellence aux
              bacheliers avec une moyenne générale supérieure à 14/20.
            </li>
            <li>50% de réduction en cas de redoublement de l'étudiant.</li>
            <li>
              10% pour les diplômés de SÉSAME et qui s ’inscrivent dans un autre
              parcours
            </li>
            <li>
              Il est à noter que les remises et les bonifications ne sont pas
              cumulables.
            </li>
          </ul>
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