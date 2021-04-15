import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import foods from './foods.json';
import Foodbox from './components/Foodbox';
import NewFoodForm from './components/NewFoodForm';
import Search from './components/Search';

class App extends Component {

  state = {
    foodsDB: [...foods], //=> BETTER SET A COPY OF THE DATA
    isFormDisplayed: false,
    searchBar: "",
    todaysFood: [],
    todaysTotalCal: 0
  }

  displayFoods = () => {
    const filteredFoods = this.filterSeachFoods();
    return filteredFoods.map((food, index) => {
      return <Foodbox {...food} key={index} addInTodaysFood = {this.addInTodaysFood}/>
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

  addInTodaysFood = (theFood)=>{
    const todaysFoodsCopy = [...this.state.todaysFood];
    //console.log(todaysFoodsCopy)
    
    if(todaysFoodsCopy.length === 0){
      //console.log("first")
      todaysFoodsCopy.push(theFood);
      //console.log(todaysFoodsCopy)
    } else {
      //console.log("not first")
      let isInTodaysFoods;
      todaysFoodsCopy.forEach(food =>{
        if(food.name === theFood.name){isInTodaysFoods = true} 
      });

      if(!isInTodaysFoods){
        todaysFoodsCopy.push(theFood);
      };

      if(isInTodaysFoods){
        todaysFoodsCopy.forEach(food => {
          if(food.name === theFood.name){
            food.quantity = food.quantity + theFood.quantity;
          };
        });
      };
    };
    
    const totalCal = todaysFoodsCopy.reduce((acc, food)=>{
      return acc + (food.calories * food.quantity)
    }, 0);

    this.setState({ 
      todaysTotalCal: totalCal,
      todaysFood: todaysFoodsCopy 
    });
  };

  
  displayTodaysFood = ()=>{
    const todaysAllFoods = [...this.state.todaysFood];
    return todaysAllFoods.map((food, index)=>{
      return (
        <li className="column foodListItem" key={index} >
          {food.quantity} {food.name} = {food.calories * food.quantity} cal
        </li>
      )
    });
  };



  render(){
    return (
      <div className="App">
        <button onClick={()=>{this.displayForm()}}>Add new food</button>
        {this.state.isFormDisplayed && <NewFoodForm addFood={this.addNewFood}/>}
        <Search updateSeachFoods={this.updateSeachFoods}/>
        <div className="foodListContainer">
          <h4>Today's food</h4>
          <ul>
            {this.displayTodaysFood()}
          </ul>
          <p>Total: {this.state.todaysTotalCal} cal</p>
        </div>
        {this.displayFoods()}
      </div>
    );
  }
}

export default App;
