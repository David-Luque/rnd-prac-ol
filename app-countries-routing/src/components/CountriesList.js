import React from 'react';
import { Link } from 'react-router-dom';


const CountriesList = (props)=> {
    
    const displayCountries = ()=>{
        const allCountriesCopy = props.countries;
        return allCountriesCopy.map((country, index) => {
            return (
                <Link to={`/countries/${country.alpha3Code}`} key={index}>
                    <div >
                        <p>{country.flag} <br/> {country.name}</p>
                    </div>
                </Link>
            )
        });
    }

    return (
        <div className="countries-list">
            {displayCountries()}
        </div>
    );
}

export default CountriesList;