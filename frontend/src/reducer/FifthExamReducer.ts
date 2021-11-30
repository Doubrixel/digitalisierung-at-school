interface FifthExamState {
  preFilledDataIn5PKFormEditedByAdmin: object;
}

const initialState: FifthExamState = {
  preFilledDataIn5PKFormEditedByAdmin: {},
};

const FifthExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PREFILLED_DATA':
      return {
        ...state, preFilledDataIn5PKFormEditedByAdmin: action.prefilledData,
      };
    default:
      return state;
  }
};

export default FifthExamReducer;
