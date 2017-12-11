import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCampusName, writeCampusDesc, editCampus } from '../store';

function EditCampusEntry(props) {
    
    const { newCampusEntry, campus, students, otherStudents, handleNameChange, handleDescChange, handleSubmit } = props;

    return (
        <div>
            {
                !campus ? null
                :
                <form onSubmit={evt => handleSubmit(newCampusEntry, campus, evt)}>
                    <div>
                        <h4>Edit {campus.name}!</h4>
                        <label>Name: </label>
                        <input
                            value={newCampusEntry.name}
                            onChange={handleNameChange}
                            className='form-control'
                            type='text'
                            name='name'
                            placeholder={campus.name}
                        />
                        <label>Description: </label>
                        <input
                            value={newCampusEntry.desc}
                            onChange={handleDescChange}
                            className='form-control'
                            type='text'
                            name='desc'
                            placeholder={campus.desc}
                        />
                    </div>
                    <div>
                        <label>Current Students: </label>
                        {
                            students.length === 0 ? <p>Sorry, no students here!</p>
                            : <ul>
                                {
                                    students.map(student => {
                                        return <li key={student.id}>
                                            {student.fullName}
                                        </li>;
                                    })
                                }
                            </ul>
                        }
                    </div>
                    <div>
                        <label>Other Students: </label>
                        {
                            otherStudents.length === 0 ? <p>Sorry, no students here!</p>
                            : <ul>
                                {
                                    otherStudents.map(student => {
                                        return <li key={otherStudent.id}>
                                            {otherStudent.fullName}
                                        </li>;
                                    })
                                }
                            </ul>
                        }
                    </div>
                    <span>
                        <button type="submit">Submit campus edits!</button>
                    </span>
                </form>
            }
        </div>
    );
}

const mapStateToProps = function(state, ownProps) {
    const campusIdToEdit = Number(ownProps.match.params.campusId);
    return {
        campus: state.campuses.find(campus => campus.id === campusIdToEdit),
        newCampusEntry: state.newCampusEntry,
        students: state.students.filter(student => student.campusId === campusIdToEdit),
        otherStudents: state.students.filter(student => student.campusId !== campusIdToEdit)
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleNameChange(evt) {
            dispatch(writeCampusName(evt.target.value));
        },
        handleDescChange(evt) {
            dispatch(writeCampusDesc(evt.target.value));
        },
        handleSubmit(newCampusEntry, campus, evt) {
            newCampusEntry.id = campus.id;
            if (!newCampusEntry.name) newCampusEntry.name = campus.name;
            if (!newCampusEntry.desc) newCampusEntry.desc = campus.desc;
            evt.preventDefault();
            dispatch(editCampus(newCampusEntry, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampusEntry);