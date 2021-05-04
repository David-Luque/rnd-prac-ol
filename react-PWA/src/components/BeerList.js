import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import ApiService from './Services/ApiService';

class beerList extends Component {
    
    state = {
        allBeers: null,
        searchBar: "",
        foundBeers: null
    };

    service = new ApiService();

    componentDidMount = ()=>{
        this.service.allBeers()
        .then(response => {
            this.setState({
                allBeers: response
            });
        })
        .catch(err => console.log(err))
    };

    handleSearch = (event)=>{
        const { value } = event.target;
        this.setState({ searchBar: value });
    };
    
    componentDidUpdate = (prevProps, prevState)=>{
        if(prevState.searchBar !== this.state.searchBar){
            if(this.state.searchBar === ""){
                this.setState({ foundBeers: null });
            } else {
                this.service.foundBeers(this.state.searchBar)
                .then(response => {
                    this.setState({ foundBeers: response });
                })
                .catch(err => console.log(err))
            }
        };
    };


    displayAllBeers = ()=>{
        return this.state.allBeers.map(beer => {
            return(
                <div key={beer._id}>
                    <Link to={`/beers/${beer._id}`}>
                        <img src={beer.image_url} alt={beer.name}/>
                        <p>{beer.name}</p>
                        <p>{beer.tagline}</p>
                        <p>{beer.contributed_by}</p>
                    </Link>
                </div>
            );
        });
    };
    
    displayFoundBeers = ()=>{
        return this.state.foundBeers.map(beer => {
            return(
                <div key={beer._id}>
                    <Link to={`/beers/${beer._id}`}>
                        <img src={beer.image_url} alt={beer.name}/>
                        <p>{beer.name}</p>
                        <p>{beer.tagline}</p>
                        <p>{beer.contributed_by}</p>
                    </Link>
                </div>
            );
        });
    };

    displayLoading = ()=>{
        return(
            <img src={require('../assets/loading-image.png')} alt="loading..." />
        );
    };


    displayBeersData = ()=>{
        if(this.state.foundBeers) {
            return this.displayFoundBeers();
        } else {
            return this.displayAllBeers();
        }
    };


    render(){
        return(
            <div>
                <Header/>
                <input type="text" name="searchBar" placeholder="Seach beer" onChange={(e)=>{this.handleSearch(e)}} />
                {this.state.allBeers 
                    ? this.displayBeersData()
                    : this.displayLoading()
                }
            </div>
        );
    };
};

export default beerList;