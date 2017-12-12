import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

function StudentsList(props) {
    const { students, campuses, handleDelete } = props;
    
    return (
        <div>
            <h2>Our Students</h2>
            <table className='student-table'>
                { 
                    students.map(student => {
                        let curCampus = campuses.filter(campus => campus.id === student.campusId)
                        return (
                            <tr className='student-row' key={student.id}>
                                <td><Link to={`/students/${student.id}`}>{student.fullName}</Link></td>
                                <td>@ <Link to={`/campuses/${curCampus[0].id}`}>{curCampus[0].name} campus</Link></td>
                                <button onClick={ evt => handleDelete(student, evt) }>Delete</button>
                                <Link to={`/students/edit-student-entry/${student.id}`}><button>Edit</button></Link>
                            </tr>
                        )
                    })
                }
            </table>
            <div className='create-button-container'>
                <Link to='/students/new-student-entry'><button>Create student</button></Link>
            </div>
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