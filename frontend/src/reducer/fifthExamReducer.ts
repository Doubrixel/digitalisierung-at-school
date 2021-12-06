export interface FifthExamState {
  allExams: Array<ExamInterface>,
  preFilledDataIn5PKFormEditedByAdmin: object;
}

export interface ExamInterface {
  examId: number,
  examType: string,
  studentName: string,
  partnerStudentName: string,
  updatedPartnerStudentName: string,
  referenzfach: string,
  updatedReferenzfach: string,
  bezugsfach: string,
  updatedBezugsfach: string,
  examiner: string,
  updatedExaminer: string,
  tutor: string,
  updatedTutor: string,
  topicArea: string,
  updatedTopicArea: string,
  problemQuestion: string,
  updatedProblemQuestion: string,
  presentationForm: string,
  updatedPresentationForm: string,
  firstSubmissionDate: Date,
  finalSubmissionDate: Date,
  approved: boolean,
  ablehnungsgrund: string,
}

const initialState: FifthExamState = {
  preFilledDataIn5PKFormEditedByAdmin: {},
  allExams: [],
};

const fifthExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PREFILLED_DATA':
      return {
        ...state, preFilledDataIn5PKFormEditedByAdmin: action.prefilledData,
      };
    case 'LOAD_ALL_EXAMS':
      return { ...state, allExams: action.payload };
    default:
      return state;
  }
};

export default fifthExamReducer;
