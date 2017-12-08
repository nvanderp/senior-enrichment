import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';

function CampusesList(props) {
    const { campuses, handleDelete } = props;
    
    return (
        <div>
            <h2>Our Campuses:</h2>
            <button>
                <Link to='/campuses/new-campus-entry'>Create campus</Link>
            </button>
            <ul>
                { 
                    campuses.map(campus => {
                        return (
                            <li key={campus.id}>
                                <Link to={`/campuses/${campus.id}`}> {campus.name}</Link>
                                <button onClick={ evt => handleDelete(campus, evt) }>Delete</button>
                                <button><Link to={`/campuses/edit-campus-entry/${campus.id}`}>Edit</Link></button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = function(state, ownProps) {
    return {
        campuses: state.campuses
    };
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        handleDelete(campus, evt) {
            dispatch(deleteCampus(campus, ownProps.history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusesList);