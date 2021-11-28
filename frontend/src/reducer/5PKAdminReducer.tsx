export interface FifthExamState {
  allExams: Array<ExamInterface>,
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
  topicArea: string,
  updatedTopicArea: string,
  problemQuestion: string,
  updatedProblemQuestion: string,
  presentationForm: string,
  updatedPresentationForm: string,
  approved: boolean,
}

const initialState: FifthExamState = {
  allExams: [],
};

const fithExamAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ALL_EXAMS':
      return { ...state, allExams: action.payload };
    default:
      return state;
  }
};

export default fithExamAdminReducer;
