import React from 'react';
import './App.css';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Footer from './components/Footer/Footer';

// Pages Import
import HomePage from './pages/HomePage';
import AGEntryPage from './pages/AGEntryPage';
import FacharbeitsEntryPage from './pages/Facharbeit/FacharbeitEntryPage';
import WahlpflichtEntryPage from './pages/WahlpflichtEntryPage';
import PruefungskomponenteEntryPage from './pages/PruefungskomponenteEntryPage';
import FacharbeitStudentListPage from './pages/Facharbeit/FacharbeitStudentListPage';
import FacharbeitApplicationForm from './pages/Facharbeit/FacharbeitApplicationForm';

function App() {
  return (
    <BrowserRouter>
      <Toolbar />
      <div id="applicationRootDiv">
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/ag"><AGEntryPage /></Route>
          <Route exact path="/facharbeit"><FacharbeitsEntryPage /></Route>
          <Route exact path="/wahlpflicht"><WahlpflichtEntryPage /></Route>
          <Route exact path="/pruefungskomponente"><PruefungskomponenteEntryPage /></Route>
          <Route exact path="/facharbeit/schuelerliste"><FacharbeitStudentListPage /></Route>
          <Route exact path="/facharbeit/beantragen"><FacharbeitApplicationForm /></Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
