import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function CampusProfile(props) {
    const { campus, students } = props;
    
    return (
        <div>
            {
                !campus ? null
                :
                <div className='campus-profile-container'>
                    <img src={campus.imageUrl}/>
                    <h2>{campus.name} Campus</h2>
                    <h4>Description</h4>
                        <p>{campus.description}</p>
                    <h4>Students</h4>
                    <div>
                        {
                            students.length === 0 ? <p>Sorry, no students here!</p>
                            : <ul>
                                {
                                    students.map(student => {
                                        return <li key={student.id}>
                                            <Link to={`/students/${student.id}`}>{student.fullName}</Link>
                                        </li>;
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = function(state, ownProps) {
    const campusId = Number(ownProps.match.params.campusId);

    return {
        campus: state.campuses.find(campus => campus.id === campusId),
        students: state.students.filter(student => student.campusId === campusId)
    };
};

export default connect(mapStateToProps)(CampusProfile);