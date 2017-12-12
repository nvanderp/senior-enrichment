import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';

function CampusesList(props) {
    const { campuses, handleDelete } = props;
    
    return (
        <div>
            <h2>Our Campuses</h2>
            <div className='campus-card-container'>
                { 
                    campuses.map(campus => {
                        return (
                            <div className='campus-card' key={campus.id}>
                                <img src={campus.imageUrl} />
                                <br />
                                <Link to={`/campuses/${campus.id}`}> {campus.name}</Link>
                                <br />
                                <button onClick={ evt => handleDelete(campus, evt) }>Delete</button>
                                <Link to={`/campuses/edit-campus-entry/${campus.id}`}><button>Edit</button></Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className='create-button-container'>
                <Link to='/campuses/new-campus-entry'><button>Create campus</button></Link>
            </div>
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