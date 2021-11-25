/* eslint-disable */

export interface StudenDataState {
    fifthPkFormData: {
        examType: string, 
        studentName: string, 
        partnerStudentName: string, 
        referenzfach: string, 
        bezugsfach: string, 
        responsibleTeacher: string, 
        topic: string, 
        approved: boolean, 
        rejectionReason: string,
    }
}

const initialState: StudenDataState = {

    fifthPkFormData: { 
        examType: "BLL",
        studentName: "Test 1", 
        partnerStudentName: "Test2", 
        referenzfach: "deutsch", 
        bezugsfach: "geschichte", 
        responsibleTeacher: "test3", 
        topic: "Goethe", 
        approved: false, 
        rejectionReason: ""
    }	
};

const studentDataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_BEZUGSFACH':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    bezugsfach: action.payload,
                },
            };
        case 'CHANGE_EXAMTYPE':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    examType: action.payload,
                },
            };
        case 'CHANGE_STUDENTNAME':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    studentName: action.payload,
                },
            };
        case 'CHANGE_STUDENTPARTNER':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    partnerStudentName: action.payload,
                },
            };
        case 'CHANGE_TOPIC':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    topic: action.payload,
                },
            };
        case 'CHANGE_REFERENZFACH':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    referenzfach: action.payload,
                },
            };
        case 'CHANGE_EXAMINER':
            return {
                ...state,
                fifthPkFormData:{
                    ...state.fifthPkFormData,
                    responsibleTeacher: action.payload,
                },
            };
        default:
            return state;
    }

};

export default studentDataReducer;