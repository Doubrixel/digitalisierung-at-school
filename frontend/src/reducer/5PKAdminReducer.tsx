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
  allExams: [
    {
      examId: 1,
      examType: 'BBL',
      studentName: 'Test',
      partnerStudentName: 'test1',
      updatedPartnerStudentName: '',
      referenzfach: 'deutsch',
      updatedReferenzfach: '',
      bezugsfach: 'geschichte',
      updatedBezugsfach: '',
      examiner: 'Test3',
      updatedExaminer: '',
      topicArea: 'Kein Plan',
      updatedTopicArea: '',
      problemQuestion: 'ebenfalls kein plan',
      updatedProblemQuestion: '',
      presentationForm: 'BS',
      updatedPresentationForm: '',
      approved: true,
    },
  ],
};

const fithExamAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default fithExamAdminReducer;
