/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';

import campuses from './campuses';
import students from './students';
import newStudentEntry from './newStudentEntry';
import newCampusEntry from './newCampusEntry';

const rootReducer = combineReducers({
  campuses,
  students,
  newStudentEntry,
  newCampusEntry
});

export default rootReducer;
