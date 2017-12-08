import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CampusesList from './CampusesList';
import CampusProfile from './CampusProfile';
import NewCampusEntry from './NewCampusEntry';
import EditCampusEntry from './EditCampusEntry';
import StudentsList from './StudentsList';
import StudentProfile from './StudentProfile';
import NewStudentEntry from './NewStudentEntry';
import EditStudentEntry from './EditStudentEntry';
import Navbar from './Navbar';

import store from '../store';
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';
 
export default class Root extends Component {

  componentDidMount() {
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <div>
        <main>
          <Navbar />
          <Switch>
            <Route exact path="/campuses" component={CampusesList} />
            <Route exact path="/campuses/new-campus-entry" component={NewCampusEntry} />
            <Route exact path="/campuses/edit-campus-entry/:campusId" component={EditCampusEntry} />
            <Route exact path="/campuses/:campusId" component={CampusProfile} />
            <Route exact path="/students" component={StudentsList} />
            <Route exact path="/students/new-student-entry" component={NewStudentEntry} />
            <Route exact path="/students/edit-student-entry/:studentId" component={EditStudentEntry} />
            <Route exact path="/students/:studentId" component={StudentProfile} />
            <Redirect to="/campuses" />
          </Switch>
        </main>
      </div>
    );
  }
}