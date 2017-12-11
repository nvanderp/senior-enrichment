import axios from 'axios';

const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const REPLACE_STUDENT = 'REPLACE_STUDENT';

export function getStudent(student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function destroyStudent(student) {
    const action = { type: DESTROY_STUDENT, student };
    return action;
}

export function replaceStudent(student) {
    const action = { type: REPLACE_STUDENT, student };
    return action;
}

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    };
}

export function postStudent(student, history) {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                const action = getStudent(newStudent);
                dispatch(action);
                history.push(`/students/${newStudent.id}`);
            });
    };
}

export function deleteStudent(student, history) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${student.id}`)
            .then(() => {
                const action = destroyStudent(student);
                dispatch(action);
            })
    }
}

export function editStudent(student, history) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${student.id}`, student)
            .then(res => res.data)
            .then(editedStudent => {
                editedStudent = editedStudent[1]
                const action = replaceStudent(editedStudent);
                dispatch(action);
                if (history) history.push(`/students/${editedStudent.id}`);
            })
    }
}

// REDUCER

export default function reducer(state = [], action) {
    let newState = Object.assign([], state)
    switch(action.type) {
        case GET_STUDENTS:
            return action.students;
        case GET_STUDENT:
            return newState.concat(action.student);
        case DESTROY_STUDENT:
            return newState.filter(student => student.id !== action.student.id);
        case REPLACE_STUDENT:
            newState = newState.filter(student => student.id !== action.student.id);
            return newState.concat(action.student);
        default:
            return state;
    }
}