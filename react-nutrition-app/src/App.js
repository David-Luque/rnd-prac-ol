import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import foods from './foods.json';
import Foodbox from './components/Foodbox';
import NewFoodForm from './components/NewFoodForm';

class App extends Component {

  state = {
    foodsDB: foods,
    isFormDisplayed: false
  }

  displayFoods = () => {
    return this.state.foodsDB.map((food, index) => {
      return <Foodbox {...food} key={index}/>
    });
  }
  
  displayForm = ()=>{
    this.setState({isFormDisplayed: !this.state.isFormDisplayed});
  };

  addNewFood = (theFood)=>{
    const foodsDBCopy = {...this.state.foodsDB};
    foodsDBCopy.push(theFood);
    this.setState({ foodsDB: foodsDBCopy });
  };


  render(){
    return (
      <div className="App">
        <button onClick={()=>{this.displayForm()}}>Add new food</button>
        {this.state.isFormDisplayed && <NewFoodForm addFood={()=>{this.addNewFood()}}/>}
        {this.displayFoods()}
      </div>
    );
  }
}

export default App;
