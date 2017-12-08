import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, writeStudentGPA, selectStudentCampus, editStudent } from '../store';

function EditStudentEntry(props) {
    
    const { newStudentEntry, student, campuses, name, email, gpa, campusId, handleNameChange, handleEmailChange, handleGPAChange, handleCampusChange, handleSubmit } = props;

    return (
        <form onSubmit={evt => handleSubmit(newStudentEntry, student.id, evt)}>
            <div>
                <h4>Edit {student.fullName}!</h4>
                <label>Name: </label>
                <input
                    value={name}
                    onChange={handleNameChange}
                    className='form-control'
                    type='text'
                    name='name'
                    placeholder='Enter student name'
                />
                <br />
                <label>Email: </label>
                <input
                    value={email}
                    onChange={handleEmailChange}
                    className='form-control'
                    type='text'
                    name='email'
                    placeholder='Enter student email'
                />
                <br />
                <label>GPA: </label>
                <input
                    value={gpa}
                    onChange={handleGPAChange}
                    className='form-control'
                    type='text'
                    name='gpa'
                    placeholder='Enter student GPA'
                />
                <br />
                <label>Campus: </label>
                <select 
                    name="campusId"
                    onChange={handleCampusChange}
                >
                    {
                        campuses.map(campus => {
                            return <option key={campus.id} value={`${campus.id}`}>{campus.name}</option>
                        })
                    }
                </select>
            </div>
            <span>
                <button type="submit">Submit student edits!</button>
            </span>
        </form>
    );
}

const mapStateToProps = function(state, ownProps) {
    const studentIdToEdit = Number(ownProps.match.params.studentId);
    return {
        student: state.students.find(student => student.id === studentIdToEdit),
        name: state.name,
        email: state.email,
        gpa: state.gpa,
        campusId: state.campusId,
        campuses: state.campuses,
        newStudentEntry: state.newStudentEntry
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleNameChange(evt) {
            dispatch(writeStudentName(evt.target.value));
        },
        handleEmailChange(evt) {
            dispatch(writeStudentEmail(evt.target.value));
        },
        handleGPAChange(evt) {
            dispatch(writeStudentGPA(evt.target.value));
        },
        handleCampusChange(evt) {
            dispatch(selectStudentCampus(evt.target.value));
        },
        handleSubmit(newStudentEntry, studentId, evt) {
            newStudentEntry.id = studentId;
            evt.preventDefault();
            newStudentEntry.firstName = newStudentEntry.name.split(' ')[0];
            newStudentEntry.lastName = newStudentEntry.name.split(' ')[1];
            dispatch(editStudent(newStudentEntry, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentEntry);