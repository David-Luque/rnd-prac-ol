import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import countries from '../countries.json';


class CountriesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            allCountries: [...countries]
        }
    }
    
    displayCountries = ()=>{
        const allCountriesCopy = [...this.state.allCountries];
        return allCountriesCopy.map(country => {
            return (
                <Link to={`/countries/${country.cca3}`}>
                    <div>
                        <p>country</p>
                    </div>
                </Link>
            )
        });
    }

    render(){
        return(
            <div>
                {this.displayCountries}
            </div>
        );
    };
}

export default CountriesList;