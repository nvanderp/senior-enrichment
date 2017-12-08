import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCampusName, writeCampusDesc, editCampus } from '../store';

function EditCampusEntry(props) {
    
    const { newCampusEntry, campus, name, desc, handleNameChange, handleDescChange, handleSubmit } = props;
    
    return (
        <form onSubmit={evt => handleSubmit(newCampusEntry, campus.id, evt)}>
            <div>
                <h4>Edit {campus.name}!</h4>
                <label>Name: </label>
                <input
                    value={name} // something.name here instead??
                    onChange={handleNameChange}
                    className='form-control'
                    type='text'
                    name='name'
                    placeholder='Edit campus name'
                />
                <label>Description: </label>
                <input
                    value={desc}
                    onChange={handleDescChange}
                    className='form-control'
                    type='text'
                    name='desc'
                    placeholder='Edit campus description'
                />
            </div>
            <span>
                <button type="submit">Submit campus edits!</button>
            </span>
        </form>
    );
}

const mapStateToProps = function(state, ownProps) {
    const campusIdToEdit = Number(ownProps.match.params.campusId);
    return {
        campus: state.campuses.find(campus => campus.id === campusIdToEdit),
        newCampusEntry: state.newCampusEntry,
        name: state.name,
        desc: state.desc,
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
        handleSubmit(newCampusEntry, campusId, evt) {
            newCampusEntry.id = campusId;
            evt.preventDefault();
            dispatch(editCampus(newCampusEntry, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampusEntry);