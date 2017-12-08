import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

function Navbar(props) {
    
    return (
        <nav>
            <h1>
                Welcome to the Margaret Hamilton Interplanetary Academy of JavaScript!
            </h1>
            <button>
                <Link to='/campuses'>Campuses</Link>
            </button>
            <button>
                <Link to='/students'>Students</Link>
            </button>
        </nav>
    );
}

export default connect()(Navbar);