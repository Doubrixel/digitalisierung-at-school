import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Footer from './components/Footer/Footer';

// Pages Import
import HomePage from './pages/student/HomePage';
import AGEntryPage from './pages/student/AGEntryPage';
import AGSinglePage from './pages/student/AGSinglePage';
import FacharbeitsEntryPage from './pages/student/Facharbeit/FacharbeitEntryPage';
import WahlpflichtEntryPage from './pages/student/WahlpflichtEntryPage';
import PruefungskomponenteEntryPage from './pages/student/PruefungskomponenteEntryPage';
import FacharbeitApplicationForm from './pages/student/Facharbeit/FacharbeitApplicationForm';
import FacharbeitStudentListPage from './pages/student/Facharbeit/FacharbeitStudentListPage';
import AdminFacharbeitPage from './pages/admin/AdminFacharbeitPage';
import AdminPruefungskomponentePage from './pages/admin/AdminPruefungskomponentePage';
import AdminFacharbeitEinzelnerSchueler from './pages/admin/AdminFacharbeitEinzelnerSchueler';
import NoAccessPage from './pages/NoAccessPage';

function App(props) {
  const { role } = props;
  return (
    <BrowserRouter>
      <Toolbar />
      <div id="applicationRootDiv">
        <Switch>
          {/* Schüler-Seiten */}
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/student/ag"><AGEntryPage /></Route>
          <Route exact path="/student/ag/agbuchung"><AGSinglePage /></Route>
          <Route exact path="/student/facharbeit"><FacharbeitsEntryPage /></Route>
          <Route exact path="/student/wahlpflicht"><WahlpflichtEntryPage /></Route>
          <Route exact path="/student/pruefungskomponente"><PruefungskomponenteEntryPage /></Route>
          <Route exact path="/student/facharbeit/schuelerliste"><FacharbeitStudentListPage /></Route>
          <Route exact path="/student/facharbeit/beantragen"><FacharbeitApplicationForm /></Route>
          {/* Admin-Seiten */}
          <Route exact path="/admin/facharbeit">
            { role === 'admin' ? <AdminFacharbeitPage /> : <NoAccessPage /> }
          </Route>
          <Route exact path="/admin/pruefungskomponente">
            { role === 'admin' ? <AdminPruefungskomponentePage /> : <NoAccessPage /> }
          </Route>
          <Route exact path="/admin/facharbeit/einzelnerSchueler">
            { role === 'admin' ? <AdminFacharbeitEinzelnerSchueler /> : <NoAccessPage /> }
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    role: state.authReducer.role,
  };
}

export default connect(mapStateToProps, null)(App);
