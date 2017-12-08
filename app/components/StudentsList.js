import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

function StudentsList(props) {
    const { students, campuses, handleDelete } = props;
    
    return (
        <div>
            <h2>Our Students:</h2>
            <button>
                <Link to='/students/new-student-entry'>Create student</Link>
            </button>
            <ol>
                { 
                    students.map(student => {
                        let curCampus = campuses.filter(campus => campus.id === student.campusId)
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>{student.fullName}</Link>,
                                <Link to={`/campuses/${curCampus[0].id}`}>{curCampus[0].name} campus</Link>
                                <button onClick={ evt => handleDelete(student, evt) }>Delete</button>
                                <button><Link to={`/students/edit-student-entry/${student.id}`}>Edit</Link></button>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

const mapStateToProps = function(state, ownProps) {
    return {
        students: state.students,
        campuses: state.campuses,
    };
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleDelete(student, evt) {
            dispatch(deleteStudent(student, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);