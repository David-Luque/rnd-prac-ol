import React from 'react';
import '../styles/SearchBar.css';

const searchBar = (props)=>{
    return (
        <div className="searchBar">
            <hr />
            <input id="searchbar" type="text" placeholder="Search product" onChange={(e)=>{props.searchProducts(e.target.value)}}/>
            <br />
            <input id="checkstock" type="checkbox" onChange={()=>{props.checkInStock()}} />
            <label for="checkstock">Show only products in stock</label>
        </div>
    );
};

export default searchBar;