const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_DESC = 'WRITE_CAMPUS_DESC';
const WRITE_CAMPUS_URL = 'WRITE_CAMPUS_URL';

export function writeCampusName(name) {
    const action = { type: WRITE_CAMPUS_NAME, name};
    return action;
}

export function writeCampusDesc(desc) {
    const action = { type: WRITE_CAMPUS_DESC, desc};
    return action;
}

export function writeCampusUrl(imageUrl) {
    const action = { type: WRITE_CAMPUS_URL, imageUrl};
    return action;
}

const initialState = {
    name: '',
    desc: '',
    imageUrl: 'https://i.pinimg.com/736x/7a/7c/4c/7a7c4c36ae31ef033206bc8d0bf86f01--pixel-art-planets.jpg'
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

        case WRITE_CAMPUS_URL:
            newState.imageUrl = action.imageUrl;
            return newState;
        default:
            return state;
    }
}