export function getComponentStatusId(componentObjectArray, whichComponent): number {
  // eslint-disable-next-line max-len
  const correctComponentObject = componentObjectArray.find((componentObject) => componentObject.name === whichComponent);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { transitionDate1, transitionDate2, transitionDate3 } = correctComponentObject;
  if (currentDate < transitionDate1) {
    return 0;
  }
  if (transitionDate1 <= currentDate && currentDate <= transitionDate2) {
    return 1;
  }
  if (transitionDate2 < currentDate && currentDate <= transitionDate3) {
    return 2;
  }
  if (transitionDate3 < currentDate) {
    return 3;
  }
  return 0;
}

export function transformISOstringToGermanDateString(ISOstring) {
  return `${ISOstring.substring(8, 10)}.${ISOstring.substring(5, 7)}.${ISOstring.substring(0, 4)}`;
}

export function getTransitionDisplayString(componentObjectArray, whichComponent) {
  // eslint-disable-next-line max-len
  const correctComponentObject = componentObjectArray.find((componentObject) => componentObject.name === whichComponent);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { transitionDate1, transitionDate2, transitionDate3 } = correctComponentObject;

  if (currentDate < transitionDate1) {
    return `Formular wird freigeschaltet am: ${transformISOstringToGermanDateString(transitionDate1)}`;
  }
  if (transitionDate1 <= currentDate && currentDate <= transitionDate2) {
    return `Abgabetermin ist am: ${transformISOstringToGermanDateString(transitionDate2)}`;
  }
  if ((transitionDate2 < currentDate && currentDate <= transitionDate3)) {
    return `Abgabetermin ist am: ${transformISOstringToGermanDateString(transitionDate3)}`;
  }
  if (currentDate > transitionDate3) {
    return `Abgabetermin war am: ${transformISOstringToGermanDateString(transitionDate3)}`;
  }
  return 'Kein Abgabedatum vorhanden.';
}
