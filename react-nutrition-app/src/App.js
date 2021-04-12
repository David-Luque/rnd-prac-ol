import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import foods from './foods.json';
import Foodbox from './components/Foodbox';
import NewFoodForm from './components/NewFoodForm';
import Search from './components/Search';

class App extends Component {

  state = {
    foodsDB: [...foods], //=> BETTER MAKE A COPY OF THE DATA 
    isFormDisplayed: false,
    searchBar: ""
  }

  displayFoods = () => {
    const filteredFoods = this.filterSeachFoods();
    return filteredFoods.map((food, index) => {
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

  updateSeachFoods = (value)=>{
    this.setState({ searchBar: value });
  };

  filterSeachFoods = ()=>{
    const filterFoods = this.state.foodsDB.filter(food => {
      return food.name.toLowerCase().includes(this.state.searchBar.toLowerCase());
    });
    return filterFoods
  };



  render(){
    return (
      <div className="App">
        <button onClick={()=>{this.displayForm()}}>Add new food</button>
        {this.state.isFormDisplayed && <NewFoodForm addFood={this.addNewFood}/>}
        <Search updateSeachFoods={this.updateSeachFoods}/>
        {this.displayFoods()}
      </div>
    );
  }
}

export default App;
