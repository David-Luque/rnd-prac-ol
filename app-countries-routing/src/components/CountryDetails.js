import React, { Component } from 'react';
//import countries from '../countries.json';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class CountryDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            country: null,
            countryName: props.match.params.name
        };
    }

    componentDidMount(){
        axios.get(`https://restcountries.eu/rest/v2/name/${this.state.countryName}`)
        .then(response => {
            this.setState({ country: response.data[0]});
        })
        .catch(err => console.log(err))  
    };
    

    displayBorderCountries(){
        return this.state.country.borders.map(borderCountry => {
            return (
                <li>{borderCountry}</li>
            )
        });
    }

    displayCountryInfo(){
        return (
            <div>
               <h2> {this.state.country.name} </h2>
                <div>Capital: {this.state.country.capital}</div>
                <div>Area: {this.state.country.area} km2</div>
                <div>
                    <p>Borders:</p>
                    <ul>
                    {this.displayBorderCountries()}
                    </ul>
                </div> 
            </div>
        ) 
    }

    
    render(){
       return (
            <div className="country-info">
                {this.state.country && this.displayCountryInfo()}
            </div>
        ); 
    }
    
};

export default CountryDetails;