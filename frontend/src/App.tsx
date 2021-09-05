import React from 'react';
import './App.css';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';

function App() {
  return (
    <BrowserRouter>
      <Toolbar />
      <Switch>
        <Route exact path="/"><h1>HOME</h1></Route>
        <Route exact path="/ag"><h1>AG BUCHUNG</h1></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
