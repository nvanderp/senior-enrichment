import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, writeStudentGPA, selectStudentCampus, editStudent } from '../store';

function EditStudentEntry(props) {
    
    const { newStudentEntry, student, campuses, campusId, handleNameChange, handleEmailChange, handleGPAChange, handleCampusChange, handleSubmit } = props;

    return (
        <div>
            {
                !student ? null
                :
                <form onSubmit={evt => handleSubmit(newStudentEntry, student.id, evt)}>
                    <div>
                        <h4>Edit {student.fullName}!</h4>
                        <label>Name: </label>
                        <input
                            value={newStudentEntry.name}
                            onChange={handleNameChange}
                            className='form-control'
                            type='text'
                            name='name'
                            placeholder={newStudentEntry.name}
                        />
                        <br />
                        <label>Email: </label>
                        <input
                            value={newStudentEntry.email}
                            onChange={handleEmailChange}
                            className='form-control'
                            type='text'
                            name='email'
                            placeholder={newStudentEntry.email}
                        />
                        <br />
                        <label>GPA: </label>
                        <input
                            value={newStudentEntry.gpa}
                            onChange={handleGPAChange}
                            className='form-control'
                            type='text'
                            name='gpa'
                            placeholder={newStudentEntry.gpa}
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
            }
        </div>
    );
}

const mapStateToProps = function(state, ownProps) {
    const studentIdToEdit = Number(ownProps.match.params.studentId);
    return {
        student: state.students.find(student => student.id === studentIdToEdit),
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