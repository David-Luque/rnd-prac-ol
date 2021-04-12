import React from 'react';

const Search = (props) => {
    return(
        <input 
            type="text" 
            name="searchBar"
            onChange={(e)=>{props.updateSeachFoods(e.target.value)}}
        />
    );
};

export default Search;