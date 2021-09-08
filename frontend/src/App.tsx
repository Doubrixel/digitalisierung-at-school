import React from 'react';
import './App.css';

import { TextFormInputFifthExamComponent } from './components/forminputElementText';
import { RadioButtonFormInputFifthExamComponent } from './components/forminputElementRadioButton';
import { SubmitButtonFormInputFifthExamComponent } from './components/forminputElementSubmitButton';

function App() {
  return (
    <form>
      <TextFormInputFifthExamComponent />
      <RadioButtonFormInputFifthExamComponent />
      <SubmitButtonFormInputFifthExamComponent />
    </form>
  );
}

export default App;
