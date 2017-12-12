import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

function Navbar(props) {
    
    return (
        <nav>
            <h1>
                Welcome to the Margaret Hamilton Interplanetary Academy of JavaScript!
            </h1>
            <div className='navbar'>
                <Link to='/campuses'><button>Campuses</button></Link>
                <Link to='/students'><button>Students</button></Link>
            </div>
        </nav>
    );
}

export default connect()(Navbar);