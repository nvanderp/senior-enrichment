import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function StudentProfile(props) {
    const { student, campuses } = props;

    const curCampus = campuses.filter(campus => campus.id === student.campusId);

    return (
        <div>
            {
                !student ? null
                :
                <div> 
                    <h2>{student.fullName}'s Student Profile</h2>
                    <span>Campus: <Link to={`/campuses/${curCampus[0].id}`}>{curCampus[0].name}</Link></span>
                    <p>Email: {student.email}</p>
                    <p>GPA: {student.gpa}</p>
                </div>
            }
        </div>
    )
}

const mapStateToProps = function(state, ownProps) {
    const studentId = Number(ownProps.match.params.studentId);

    return {
        student: state.students.find(student => student.id === studentId),
        campuses: state.campuses
    };
};

export default connect(mapStateToProps)(StudentProfile);