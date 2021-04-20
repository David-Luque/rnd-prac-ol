import React from 'react';
import { Link } from 'react-router-dom';


const CountriesList = (props)=> {
    
    const displayCountries = ()=>{
        const allCountriesCopy = props.countries;
        return allCountriesCopy.map((country, index) => {
            return (
                <Link to={`/countries/${country.alpha3Code}`} key={index}>
                    <div className="country-row">
                        <img src={country.flag} alt={country.name} />
                        <p>{country.name}</p>
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