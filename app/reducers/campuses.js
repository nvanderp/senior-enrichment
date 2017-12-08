import axios from 'axios';

const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const REPLACE_CAMPUS = 'REPLACE_CAMPUS';

export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses};
    return action;
}

export function destroyCampus(campus) {
    const action = { type: DESTROY_CAMPUS, campus };
    return action;
}

export function replaceCampus(campus) {
    const action = { type: REPLACE_CAMPUS, campus };
    return action;
}

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    };
}

export function postCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = getCampus(newCampus);
                dispatch(action);
                history.push(`/campuses/${newCampus.id}`);
            });
    };
}

export function deleteCampus(campus) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campus.id}`)
            .then(() => {
                const action = destroyCampus(campus);
                dispatch(action);
            })
    }
}

export function editCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campus.id}`, campus)
            .then(res => res.data)
            .then(editedCampus => {
                editedCampus = editedCampus[1]
                const action = replaceCampus(editedCampus);
                dispatch(action);
                history.push(`/campuses/${editedCampus.id}`);
            })
    }
}

// REDUCER

export default function reducer(state = [], action) {
    let newState = Object.assign([], state)
    switch(action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case GET_CAMPUS:
            return newState.concat(action.campus);
        case DESTROY_CAMPUS:
            return newState.filter(campus => campus.id !== action.campus.id);
        case REPLACE_CAMPUS:
            newState = newState.filter(campus => campus.id !== action.campus.id);
            return newState.concat(action.campus);
        default:
            return state;
    }
}