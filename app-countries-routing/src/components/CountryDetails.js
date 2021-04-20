import React, { Component } from 'react';
//import countries from '../countries.json';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CountryDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            countryCode: this.props.match.params.alpha3Code,
            country: null
        };
    }

    componentDidMount(){
        console.log("get info with " + this.state.countryCode)
        axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.countryCode}`)
        .then(response => {
            this.setState({ country: response.data });
        })
        .catch(err => console.log(err))
    };

    componentDidUpdate(prevProps){
        if(this.props.match.params.alpha3Code !== prevProps.match.params.alpha3Code){
            axios.get(`https://restcountries.eu/rest/v2/alpha/${this.props.match.params.alpha3Code}`)
            .then(response => {
                this.setState({ country: response.data });
            })
            .catch(err => console.log(err))
        }
    }
    

    displayBorderCountries(){
        return this.state.country.borders.map((alpha3Code, index) => {
            return (
                <li key={index}>
                    <Link to={`/countries/${alpha3Code}`}>
                        {alpha3Code}
                    </Link>
                </li>
            )
        });
    };

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
    };

    
    render(){
       return (
            <div className="country-info">
                {this.state.country && this.displayCountryInfo()}
            </div>
        ); 
    }
    
};

export default CountryDetails;