import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Formulaire.css';

const africanCountries = [
  { code: '+213', name: 'Algeria' },
  { code: '+216', name: 'Tunisia' },
  { code: '+220', name: 'Gambia' },
  { code: '+221', name: 'Senegal' },
  { code: '+230', name: 'Mauritius' },
  { code: '+232', name: 'Sierra Leone' },
  { code: '+233', name: 'Ghana' },
  { code: '+234', name: 'Nigeria' },
  { code: '+235', name: 'Chad' },
  { code: '+236', name: 'Central African Republic' },
  { code: '+237', name: 'Cameroon' },
  { code: '+238', name: 'Cape Verde' },
  { code: '+239', name: 'São Tomé and Príncipe' },
  { code: '+240', name: 'Equatorial Guinea' },
  { code: '+241', name: 'Gabon' },
  { code: '+242', name: 'Republic of Congo' },
  { code: '+243', name: 'Democratic Republic of the Congo' },
  { code: '+244', name: 'Angola' },
  { code: '+245', name: 'Guinea-Bissau' },
  { code: '+246', name: 'British Indian Ocean Territory' },
  { code: '+247', name: 'Ascension Island' },
  { code: '+248', name: 'Seychelles' },
  { code: '+249', name: 'Sudan' },
  { code: '+250', name: 'Rwanda' },
  { code: '+251', name: 'Ethiopia' },
  { code: '+252', name: 'Somalia' },
  { code: '+253', name: 'Djibouti' },
  { code: '+254', name: 'Kenya' },
  { code: '+255', name: 'Tanzania' },
  { code: '+256', name: 'Uganda' },
  { code: '+257', name: 'Burundi' },
  { code: '+258', name: 'Mozambique' },
  { code: '+260', name: 'Zambia' },
  { code: '+261', name: 'Madagascar' },
  { code: '+262', name: 'Réunion' },
  { code: '+263', name: 'Zimbabwe' },
  { code: '+264', name: 'Namibia' },
  { code: '+265', name: 'Malawi' },
  { code: '+266', name: 'Lesotho' },
  { code: '+267', name: 'Botswana' },
  { code: '+268', name: 'Eswatini' },
  { code: '+269', name: 'Comoros' },
];

const Formulaire = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numberphone: '',
    countrycode: '+216', // Default to Tunisia code
    pays: '',
    ville: '',
    etablissement: '',
    diplomes: '',
    nomParrain: '',
    matriculeParrain: '',
  });
  const [selectedOption, setSelectedOption] = useState({
    licence: '',
    cycle: '',
    master: '',
  });
 // setFormErrors({});
   // navigate('/form2'); // Redirige vers le deuxième formulaire
  
  const [formErrors, setFormErrors] = useState({});

  const validateName = (name) => {
    const regex = /^(?!.*(.)\1{3})[a-zA-Z]+$/;
    return regex.test(name);
  };

  const handleChange = (event) => {
    const { id, value, type, name } = event.target;
    if (type === 'radio') {
      setSelectedOption({
        ...selectedOption,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });

      if ((id === 'nom' || id === 'prenom') && !validateName(value)) {
        setFormErrors({
          ...formErrors,
          [id]: 'Le champ ne doit pas contenir de caractères spéciaux, de chiffres, ou de lettres répétitives plus que 3 fois.',
        });
      } else {
        setFormErrors({
          ...formErrors,
          [id]: '',
        });
      }
    }
  };
  
  const handleNavigate = () => {
    navigate('/form2');
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.nom) errors.nom = 'Le nom est requis.';
    if (formData.nom && !validateName(formData.nom)) errors.nom = 'Le nom ne doit pas contenir de caractères spéciaux, de chiffres, ou de lettres répétitives plus que 3 fois.';
    if (!formData.prenom) errors.prenom = 'Le prénom est requis.';
    if (formData.prenom && !validateName(formData.prenom)) errors.prenom = 'Le prénom ne doit pas contenir de caractères spéciaux, de chiffres, ou de lettres répétitives plus que 3 fois.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Un email valide est requis.';
    if (!formData.numberphone) errors.numberphone = 'Le numéro de téléphone est requis.';
    if (!formData.pays) errors.pays = 'Le pays/région est requis.';
    if (!formData.ville) errors.ville = 'La ville est requise.';
    if (!formData.etablissement) errors.etablissement = 'L’établissement actuel est requis.';
    if (!formData.diplomes) errors.diplomes = 'Votre dernier diplôme/niveau d’études est requis.';
    // Optional fields, validate if provided
  if (formData.nomParrain && !validateName(formData.nomParrain)) errors.nomParrain = 'Le nom du parrain, s\'il est fourni, ne doit pas contenir de caractères spéciaux, de chiffres, ou de lettres répétitives plus que 3 fois.';
  
  if (formData.matriculeParrain && !/^\d{1,10}$/.test(formData.matriculeParrain)) errors.matriculeParrain = 'Le matricule du parrain doit être un nombre de 1 à 10 chiffres.';


    if (!selectedOption.licence && !selectedOption.cycle && !selectedOption.master) {
      errors.licence = 'Veuillez choisir au moins une option.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      console.log('Selected options:', selectedOption);

      const pays = formData.pays.toLowerCase();
      if (pays === 'tunisie' || pays === 'tunisia') {
        if (selectedOption.master) {
          alert(`Bonjour ${formData.nom} ${formData.prenom} !!\nLe montant annuel de votre parcours est 8560 DT`);
        } else if (selectedOption.cycle === 'Ingénierie informatique en Temps Aménagé') {
          alert(`Bonjour ${formData.nom} ${formData.prenom} !!\nLe montant annuel de votre parcours est 6152,500 DT`);
        } else if (selectedOption.cycle) {
          alert(`Bonjour ${formData.nom} ${formData.prenom} !!\nLe montant annuel de votre parcours est 6950 DT`);
        } else if (selectedOption.licence) {
          alert(`Bonjour ${formData.nom} ${formData.prenom} !!\nLe montant annuel de votre parcours est 6.420 DT`);
        }
      } else {
        alert(`Bonjour ${formData.nom} ${formData.prenom} !!\nLe montant annuel de votre parcours est 3000 euros`);
      }
    }
  };

  const renderLicenceOptions = () => (
    <div className="form-group">
      <label><h3>Je souhaite faire une Licence</h3></label><br />
      <label>
        <input
          type="radio"
          name="licence"
          value="Licence en informatique et multimédia"
          checked={selectedOption.licence === 'Licence en informatique et multimédia'}
          onChange={handleChange}
        />
        Licence en informatique et multimédia
      </label><br />
      <label>
        <input
          type="radio"
          name="licence"
          value="Licence en management"
          checked={selectedOption.licence === 'Licence en management'}
          onChange={handleChange}
        />
        Licence en management
      </label>
      <div className="invalid-feedback d-block">
        {formErrors.licence}
      </div>
    </div>
  );
  
  const renderCycleOptions = () => (
    <div className="form-group">
      <label><h3>Je souhaite faire un Cycle Ingénieur</h3></label><br />
      {(formData.diplomes === 'bac')&& (
        <>
          <label>
            <input
              type="radio"
              name="cycle"
              value="1er cycle ingénieur"
              checked={selectedOption.cycle === '1er cycle ingénieur'}
              onChange={handleChange}
            />
            1er cycle ingénieur
          </label><br />
        </>
      )}
      {(formData.diplomes === 'prepa' || formData.diplomes === 'cycle' || formData.diplomes === 'master')  && (
        <>
          <label>
            <input
              type="radio"
              name="cycle"
              value="2ème cycle ingénieur en informatique"
              checked={selectedOption.cycle === '2ème cycle ingénieur en informatique'}
              onChange={handleChange}
            />
            2ème cycle ingénieur en informatique
          </label><br />
          {formData.diplomes !== 'prepa' && (
            <label>
              <input
                type="radio"
                name="cycle"
                value="Ingénierie informatique en Temps Aménagé"
                checked={selectedOption.cycle === 'Ingénierie informatique en Temps Aménagé'}
                onChange={handleChange}
              />
              Ingénierie informatique en Temps Aménagé
            </label>
          )}
        </>
      )}
      <div className="invalid-feedback d-block">
        {formErrors.cycle}
      </div>
    </div>
  );
  
  
  const renderMasterOptions = () => (
    <div className="form-group">
      <label><h3>Je souhaite faire un Master Professionnel</h3></label><br />
      <label>
        <input
          type="radio"
          name="master"
          value="Master en transformation digitale & ERP"
          checked={selectedOption.master === 'Master en transformation digitale & ERP'}
          onChange={handleChange}
        />
        Master en transformation digitale & ERP
      </label><br />
      <label>
        <input
          type="radio"
          name="master"
          value="Master en marketing digital & data analytics"
          checked={selectedOption.master === 'Master en marketing digital & data analytics'}
          onChange={handleChange}
        />
        Master en marketing digital & data analytics
      </label><br />
      <label>
        <input
          type="radio"
          name="master"
          value="Master en supply chain management"
          checked={selectedOption.master === 'Master en supply chain management'}
          onChange={handleChange}
        />
        Master en supply chain management
      </label>
      <div className="invalid-feedback d-block">
        {formErrors.master}
      </div>
    </div>
  );
  
  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: '#0551e8' }}>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit}>
        {/* Champ Nom */}
        <div className="form-group">
          <label htmlFor="nom">Nom: (*)</label>
          <input
            type="text"
            className={`form-control ${formErrors.nom ? 'is-invalid' : ''}`}
            id="nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.nom}</div>
        </div>
        
        {/* Champ Prénom */}
        <div className="form-group">
          <label htmlFor="prenom">Prénom: (*)</label>
          <input
            type="text"
            className={`form-control ${formErrors.prenom ? 'is-invalid' : ''}`}
            id="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.prenom}</div>
        </div>
        
        {/* Champ Email */}
        <div className="form-group">
          <label htmlFor="email">Email: (*)</label>
          <input
            type="email"
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.email}</div>
        </div>
        
        {/* Champ Numéro de Téléphone */}
        <div className="form-group">
          <label htmlFor="numberphone">Numéro de téléphone: (*)</label>
          <input
            type="text"
            className={`form-control ${formErrors.numberphone ? 'is-invalid' : ''}`}
            id="numberphone"
            value={formData.numberphone}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.numberphone}</div>
        </div>

        {/* Champ Code du pays */}
        <div className="form-group">
          <label htmlFor="countrycode">Code du pays: (*)</label>
          <select
            className={`form-control ${formErrors.countrycode ? 'is-invalid' : ''}`}
            id="countrycode"
            value={formData.countrycode}
            onChange={handleChange}
          >
            {africanCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{formErrors.countrycode}</div>
        </div>

        {/* Champ Pays/Région */}
        <div className="form-group">
          <label htmlFor="pays">Pays/Région:*</label>
          <select
            className={`form-control ${formErrors.pays ? 'is-invalid' : ''}`}
            id="pays"
            value={formData.pays}
            onChange={handleChange}
          >
            <option value="">Sélectionner un pays </option>
            {africanCountries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{formErrors.pays}</div>
        </div>

        {/* Champs Ville, Établissement */}
        <div className="form-group">
          <label htmlFor="ville">Ville: (*)</label>
          <input
            type="text"
            className={`form-control ${formErrors.ville ? 'is-invalid' : ''}`}
            id="ville"
            value={formData.ville}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.ville}</div>
        </div>

        <div className="form-group">
          <label htmlFor="etablissement">Établissement: (*)</label>
          <input
            type="text"
            className={`form-control ${formErrors.etablissement ? 'is-invalid' : ''}`}
            id="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.etablissement}</div>
        </div>

        {/* Champs Diplômes */}
        <div className="form-group">
          <label htmlFor="diplomes">Dernier diplôme/Niveau d'études: (*)</label>
          <select
            className={`form-control ${formErrors.diplomes ? 'is-invalid' : ''}`}
            id="diplomes"
            value={formData.diplomes}
            onChange={handleChange}
          >
            <option value="">Sélectionner un diplôme </option>
            <option value="bac">Bac</option>
            <option value="prepa">Prépa</option>
            <option value="cycle">Cycle ingénieur</option>
            <option value="master">Master</option>
          </select>
          <div className="invalid-feedback">{formErrors.diplomes}</div>
        </div>

        {/* Rendu conditionnel des options de diplôme */}
        {formData.diplomes === 'bac' && (
      <>
        {renderLicenceOptions()}
        {renderCycleOptions()}
      </>
    )}
    
    {formData.diplomes === 'prepa' && (
          <>
            {renderCycleOptions()}
            {renderLicenceOptions()}
          </>
        )}

        {formData.diplomes === 'cycle' && (
          <>
            {renderCycleOptions()}
            {renderMasterOptions()}
          </>
        )}
        {formData.diplomes === 'master' && (
          <>
            {renderCycleOptions()}
            {renderMasterOptions()}
          </>
        )}

        {/* Champ Nom du Parrain */}
        <div className="form-group">
          <label htmlFor="nomParrain">Nom du parrain: (Optionnel)</label>
          <input
            type="text"
            className={`form-control ${formErrors.nomParrain ? 'is-invalid' : ''}`}
            id="nomParrain"
            value={formData.nomParrain}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.nomParrain}</div>
        </div>

        {/* Champ Matricule du Parrain */}
        <div className="form-group">
          <label htmlFor="matriculeParrain">Matricule du parrain: (Optionnel)</label>
          <input
            type="text"
            className={`form-control ${formErrors.matriculeParrain ? 'is-invalid' : ''}`}
            id="matriculeParrain"
            value={formData.matriculeParrain}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.matriculeParrain}</div>
        </div>

        <center><button  type="submit" className="btn btn-primary"><center>Envoyer</center></button></center><br></br>
        <center><button  type="button" className="btn btn-secondary ml-2" onClick={handleNavigate}><center>Remise</center></button></center>
      </form>
    </div>
  );
};

export default Formulaire;
