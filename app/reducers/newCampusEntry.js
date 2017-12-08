const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_DESC = 'WRITE_CAMPUS_DESC';

export function writeCampusName(name) {
    const action = { type: WRITE_CAMPUS_NAME, name};
    return action;
}

export function writeCampusDesc(desc) {
    const action = { type: WRITE_CAMPUS_DESC, desc};
    return action;
}

const initialState = {
    name: '',
    desc: ''
}

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {

        case WRITE_CAMPUS_NAME:
            newState.name = action.name;
            return newState;

        case WRITE_CAMPUS_DESC:
            newState.desc = action.desc;
            return newState;

        default:
            return state;
    }
}