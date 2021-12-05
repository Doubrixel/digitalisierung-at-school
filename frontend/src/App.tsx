import React from 'react';
import './App.css';
import { connect, useDispatch } from 'react-redux';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Footer from './components/Footer/Footer';

// Pages Import
import HomePage from './pages/student/HomePage';
import FacharbeitsEntryPage from './pages/student/Facharbeit/FacharbeitEntryPage';
import PruefungskomponenteEntryPage from './pages/student/PruefungskomponenteEntryPage';
import FacharbeitApplicationForm from './pages/student/Facharbeit/FacharbeitApplicationForm';
import AdminFacharbeitPage from './pages/admin/AdminFacharbeitPage';
import AdminPruefungskomponentePage from './pages/admin/AdminPruefungskomponentePage';
import AdminFacharbeitEinzelnerSchueler from './pages/admin/AdminFacharbeitEinzelnerSchueler';
import NoAccessPage from './pages/NoAccessPage';
import sendAPIRequest from './APIRequestFunction';
import { login, setUserData } from './actions/authActions';
import {
  FA_ADMIN_ROLE, FIFTH_PK_ADMIN_ROLE, SUPER_ADMIN_ROLE, STUDENT_ROLE,
} from './reducer/authReducer';

function App(props) {
  const { role } = props;
  const dispatch = useDispatch();
  sendAPIRequest('auth/getUserData', 'GET')
    .then((response) => response.json())
    .then((data) => {
      dispatch(setUserData(data.name, data.roles, data.groups));
      dispatch(login());
    })
    .catch((err) => {
      console.log(`error: ${err.message}`);
      dispatch(setUserData('Nicht eingeloggt', [], []));
    });
  return (
    <BrowserRouter>
      <div id="applicationContent">
        <Toolbar />
        <div id="applicationRootDiv">
          <Switch>
            {/* Schüler-Seiten */}
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/student/facharbeit">{ role === STUDENT_ROLE ? <FacharbeitsEntryPage /> : <NoAccessPage /> }</Route>
            <Route exact path="/student/pruefungskomponente">
              { /* eslint-disable-next-line max-len */ }
              { role === STUDENT_ROLE ? <PruefungskomponenteEntryPage isGettingEditedByAdmin={false} /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/student/facharbeit/beantragen">
              { role === STUDENT_ROLE ? <FacharbeitApplicationForm /> : <NoAccessPage /> }
            </Route>
            {/* Admin-Seiten */}
            {/* Facharbeitsseiten */}
            <Route exact path="/admin/facharbeit">
              { role === SUPER_ADMIN_ROLE || role === FA_ADMIN_ROLE
                ? <AdminFacharbeitPage /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/admin/facharbeit/einzelnerSchueler">
              { role === SUPER_ADMIN_ROLE || role === FA_ADMIN_ROLE
                ? <AdminFacharbeitEinzelnerSchueler /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/admin/facharbeit">
              { role === SUPER_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE
                ? <AdminFacharbeitPage /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/admin/facharbeit/einzelnerSchueler"><AdminFacharbeitEinzelnerSchueler /></Route>

            {/* 5. PK seiten */}
            <Route exact path="/admin/pruefungskomponente">
              { role === SUPER_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE
                ? <AdminPruefungskomponentePage /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/admin/pruefungskomponente">
              { role === SUPER_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE
                ? <AdminPruefungskomponentePage /> : <NoAccessPage /> }
            </Route>
            <Route exact path="/admin/pruefungskomponente/editStudentApplication">
              { role === SUPER_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE
                ? <PruefungskomponenteEntryPage isGettingEditedByAdmin /> : <NoAccessPage /> }
            </Route>
          </Switch>
        </div>
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
