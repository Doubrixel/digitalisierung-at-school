import React from 'react';

import ForminputElementRadioButton from '../FormInput/ForminputElementRadioButton';
import ForminputElementText from '../FormInput/ForminputElementText';
import ForminputElementSubmitButton from '../FormInput/ForminputElementSubmitButton';
import ForminputElementDropDown from '../FormInput/ForminputElementDropDown';

function FifthExamFormComponent() {
  function sendData() {

  }
  return (
    <div>
      <form>
        <ForminputElementRadioButton labelText="Präsentationsprüfung" name="examtype" />
        <ForminputElementRadioButton labelText="Besondere Lernleistung" name="examtype" />
        <ForminputElementText labelText="Prüfling" name="student" />
        <ForminputElementText labelText="ggf. Partner:in" name="studentPartner" />

        <ForminputElementDropDown valueArray={['Mathe', 'Deutsch']} labelText="Referenzfach" name="referenzFach" />
        <ForminputElementDropDown valueArray={['Fr. Mustermann', 'Hr. Mustermann']} labelText="Prüfer:in" name="examiner" />
        <ForminputElementDropDown valueArray={['Mathe', 'Deutsch']} labelText="Bezugsfach" name="bezugsFach" />

        <ForminputElementText labelText="gewählter Themenbereich" name="chosenTopicArea" />
        {/* found no binds for function components */}
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <ForminputElementSubmitButton onClickMethod={sendData} />
      </form>
    </div>
  );
}

export default FifthExamFormComponent;
