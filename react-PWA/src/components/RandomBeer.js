import React, { Component } from 'react';
import Header from './Header';
import ApiService from './Services/ApiService';

class randomBeer extends Component {

    state = {};

    service = new ApiService();

    componentDidMount = ()=>{
        this.getBeerInfo();
    };

    getBeerInfo = ()=>{
        this.service.randomBeer()
        .then(response => {
            this.setState({
                beerInfo: response
            });
        })
        .catch(err => console.log(err))
    };

    displayBeerInfo = ()=>{
        const {
            image_url,
            name, 
            tagline, 
            first_brewed, 
            attenuation_level,
            description,
            contributed_by
        } = this.state.beerInfo;

        return(
            <div>
                <img src={image_url} alt={name} />
                <p>{name}</p>
                <p>{tagline}</p>
                <p>{first_brewed}</p>
                <p>{attenuation_level}</p>
                <p>{description}</p>
                <p>{contributed_by}</p>
            </div>
        );
    };


    render(){
        return(
            <div>
                <Header />
                {this.state.beerInfo && this.displayBeerInfo()}
            </div>
        );
    };
};

export default randomBeer;