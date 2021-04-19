import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import axios from 'axios';


class App extends Component {

  state = {
    countries: null
  };

  componentDidMount(){
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response =>{
      this.setState({ countries: response.data });
    })
    .catch(err => console.log(err))
  };

  render(){
    return (
      <div className="App">
        <Navbar />

        <div className="container">
          <div className="row">
            {this.state.countries && <CountriesList countries={this.state.countries} />}
            <Switch>
              <Route 
                exact path="/countries/:name" 
                component={CountryDetails} 
              />
            </Switch>
          </div>
        </div>

        

        
      </div>
    );
  }
}

export default App;
