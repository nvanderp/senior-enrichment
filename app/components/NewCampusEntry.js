import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCampusName, writeCampusDesc, writeCampusUrl, postCampus } from '../store';

function NewCampusEntry(props) {
    
    const { newCampusEntry, name, desc, url, handleNameChange, handleDescChange, handleUrlChange, handleSubmit } = props;

    return (
        <form onSubmit={evt => handleSubmit(newCampusEntry, evt)}>
            <div>
                <h4>Create a campus!</h4>
                <label>Name: </label>
                <input
                    value={name} // something.name here instead??
                    onChange={handleNameChange}
                    className='form-control'
                    type='text'
                    name='name'
                    placeholder='Enter campus name'
                />
                <label>Description: </label>
                <input
                    value={desc}
                    onChange={handleDescChange}
                    className='form-control'
                    type='text'
                    name='desc'
                    placeholder='Enter campus description'
                />
                <label>Image URL: </label>
                <input
                    value={url}
                    onChange={handleUrlChange}
                    className='form-control'
                    type='text'
                    name='url'
                    placeholder='Enter campus image URL'
                />
            </div>
            <span>
                <button type="submit">Submit campus!</button>
            </span>
        </form>
    );
}

const mapStateToProps = function(state, ownProps) {
    return {
        name: state.name,
        desc: state.desc,
        url: state.imageUrl,
        newCampusEntry: state.newCampusEntry
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
        handleUrlChange(evt) {
            dispatch(writeCampusUrl(evt.target.value));
        },
        handleSubmit(newCampusEntry, evt) {
            evt.preventDefault();
            dispatch(postCampus(newCampusEntry, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);