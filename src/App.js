import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formulaire from './Formulaire';
import Form2 from './Form2'; // Assurez-vous que ce fichier existe

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Formulaire />} />
        <Route path="/form2" element={<Form2 />} />
      </Routes>
    </Router>
  );
}

export default App;
