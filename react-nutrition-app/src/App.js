import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import foods from './foods.json';
import Foodbox from './components/Foodbox';
import NewFoodForm from './components/NewFoodForm';
import SearchBar from './components/SearchBar';

class App extends Component {

  state = {
    foodsDB: foods,
    isFormDisplayed: false,
    filterFoods: null
  }

  displayFoods = (array) => {
    return array.map((food, index) => {
      return <Foodbox {...food} key={index}/>
    });
  };
  
  displayForm = ()=>{
    this.setState({isFormDisplayed: !this.state.isFormDisplayed});
  };

  addNewFood = (theFood)=>{
    const foodsDBCopy = [...this.state.foodsDB];
    foodsDBCopy.push(theFood);
    this.setState({ foodsDB: foodsDBCopy, isFormDisplayed: false});
  };

  displaySeachedFoods = (string)=>{
    //console.log(string)
    //if(string === ""){ return console.log("empty string")}
    if(!string){ return this.displayFoods(this.state.foodsDB)}
    
    const filterFoods = this.state.foodsDB.filter(food => {
      return food.name.toLowerCase().includes(string);
    });

    this.setState({ filterFoods });
    console.log(this.state)
    //this.displayFoods(this.state.filterFoods);

  };


  render(){
    return (
      <div className="App">
        <button onClick={()=>{this.displayForm()}}>Add new food</button>
        {this.state.isFormDisplayed && <NewFoodForm addFood={this.addNewFood}/>}
        <SearchBar showFoods={this.displaySeachedFoods}/>
        {this.displayFoods(this.state.foodsDB)}
      </div>
    );
  }
}

export default App;
