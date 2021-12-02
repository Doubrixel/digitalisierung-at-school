export function getComponentStatusId(componentObjectArray, whichComponent): number {
  // eslint-disable-next-line max-len
  const correctComponentObject = componentObjectArray.find((componentObject) => componentObject.name === whichComponent);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { transitionDate1, transitionDate2, transitionDate3 } = correctComponentObject;
  if (currentDate < transitionDate1) {
    return 0;
  }
  if (transitionDate1 <= currentDate && currentDate < transitionDate2) {
    return 1;
  }
  if (transitionDate2 <= currentDate && currentDate < transitionDate3) {
    return 2;
  }
  if (transitionDate3 <= currentDate) {
    return 3;
  }
  return 0;
}

export function getNextTransitionDate(componentObjectArray, whichComponent) {
  // eslint-disable-next-line max-len
  const correctComponentObject = componentObjectArray.find((componentObject) => componentObject.name === whichComponent);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { transitionDate1, transitionDate2, transitionDate3 } = correctComponentObject;

  if (currentDate < transitionDate1) {
    return transitionDate1;
  }
  if (currentDate >= transitionDate1 && currentDate < transitionDate2) {
    return transitionDate2;
  }
  // eslint-disable-next-line max-len
  if ((currentDate >= transitionDate2 && currentDate < transitionDate3) || currentDate > transitionDate3) {
    return transitionDate3;
  }
  if (currentDate >= transitionDate3) {
    return transitionDate3;
  }
  return 'ungültig';
}
