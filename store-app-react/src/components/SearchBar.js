import React from 'react';

const searchBar = (props)=>{
    return (
        <div className="searchBar">
            <label>Seach</label>
            <input type="text" onChange={(e)=>{props.searchProducts(e.target.value)}}/>
            <br />
            <label>Show only products in stock</label>
            <input type="checkbox" onChange={()=>{props.checkInStock()}} />
        </div>
    );
};

export default searchBar;