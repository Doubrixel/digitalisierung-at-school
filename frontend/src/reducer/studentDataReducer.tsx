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
        examType: "", 
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
        case 'Test':
            return state;
        default:
            return state;
    }

};

export default studentDataReducer;