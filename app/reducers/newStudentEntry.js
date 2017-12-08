const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
const WRITE_STUDENT_GPA = 'WRITE_STUDENT_GPA';
const SELECT_STUDENT_CAMPUS = 'SELECT_STUDENT_CAMPUS';

export function writeStudentName(name) {
    const action = { type: WRITE_STUDENT_NAME, name };
    return action;
}

export function writeStudentEmail(email) {
    const action = { type: WRITE_STUDENT_EMAIL, email };
    return action;
}

export function writeStudentGPA(gpa) {
    const action = { type: WRITE_STUDENT_GPA, gpa };
    return action;
}

export function selectStudentCampus(campusId) {
    const action = { type: SELECT_STUDENT_CAMPUS, campusId}
    return action;
}

const initialState = {
    name: '',
    email: '',
    gpa: 0,
    campusId: 0
}

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case WRITE_STUDENT_NAME:                    // update_form, update all props at once?
            newState.name = action.name;
            return newState;

        case WRITE_STUDENT_EMAIL:
            newState.email = action.email;
            return newState;

        case WRITE_STUDENT_GPA:
            newState.gpa = action.gpa;
            return newState;

        case SELECT_STUDENT_CAMPUS:
            newState.campusId = action.campusId;
            return newState;

        default:
            return state;
    }

}