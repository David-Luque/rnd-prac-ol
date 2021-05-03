import React from 'react';
import { Link } from 'react-router-dom';
const header = ()=>{
    return(
        <header className="header">
            <Link to="/">
                <span>Home</span>
            </Link>
        </header>
    );
};

export default header;