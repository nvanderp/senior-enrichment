import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, writeStudentGPA, selectStudentCampus, postStudent } from '../store';

function NewStudentEntry(props) {
    
    const { newStudentEntry, campuses, campusId, handleNameChange, handleEmailChange, handleGPAChange, handleCampusChange, handleSubmit } = props;

    return (
        <form onSubmit={evt => handleSubmit(newStudentEntry, evt)}>
            <div>
                <h4>Create a student!</h4>
                <label>Name: </label>
                <input
                    value=''
                    onChange={handleNameChange}
                    className='form-control'
                    type='text'
                    name='name'
                    placeholder='Enter student name'
                />
                <br />
                <label>Email: </label>
                <input
                    value=''
                    onChange={handleEmailChange}
                    className='form-control'
                    type='text'
                    name='email'
                    placeholder='Enter student email'
                />
                <br />
                <label>GPA: </label>
                <input
                    value=''
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
                <button type="submit">Submit student!</button>
            </span>
        </form>
    );
}

const mapStateToProps = function(state, ownProps) {
    return {
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
        handleSubmit(newStudentEntry, evt) {
            // console.log(ownProps.history);
            evt.preventDefault();
            newStudentEntry.firstName = newStudentEntry.name.split(' ')[0];
            newStudentEntry.lastName = newStudentEntry.name.split(' ')[1];
            dispatch(postStudent(newStudentEntry, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);