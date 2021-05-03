import React from 'react';
import './App.css';
import Home from './components/Home';
import BeerList from './components/BeerList';
import RandomBeer from './components/RandomBeer';
import NewBeer from './components/NewBeer';
import BeerDetails from './components/BeerDetails';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
    <Switch>
      <Route exact path = '/' component={Home} />
      <Route exact path='/beers' component={BeerList} />
      <Route exact path="/beers/:beerId" component={BeerDetails}/>
      <Route exact path='/random-beer' component={RandomBeer} />
      <Route exact path='/new-beer' component={NewBeer} />
    </Switch>
    </div>
    
  );
}

export default App;
