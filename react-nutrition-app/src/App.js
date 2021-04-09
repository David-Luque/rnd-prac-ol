import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import foods from './foods.json';
import Foodbox from './components/Foodbox';

class App extends Component {

  state = {
    foodsDB: foods
  }

  displayFoods = () => {
    return this.state.foodsDB.map(food => {
      return <Foodbox foodInfo={food} />
    });
  }
  
  render(){
    return (
      <div className="App">
        {this.displayFoods()}
      </div>
    );
  }
}

export default App;
