import React from 'react';

class newFoodForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newFood: {
                name: '',
                calories: '',
                image: ''
            }
        };
    };
    
    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({ newFood: {...this.state.newFood, [name]: value} });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const {name, calories, image} = this.state.newFood;
        const theNewFood = {name, calories, image};
        this.props.addFood(theNewFood);
        this.setState({ newFood: {
            name: '',
            calories: '',
            image: ''
        }});
    };


    render(){
       return (
            <form className="newFoodForm" onSubmit={this.handleFormSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={this.state.newFood.name} onChange={(e)=>this.handleChange(e)} />
                <label>Calories:</label>
                <input type="text" name="calories" value={this.state.newFood.calories} onChange={(e)=>{this.handleChange(e)}} />
                <label>Image:</label>
                <input type="text" name="image" value={this.state.newFood.image} onChange={(e)=>{this.handleChange(e)}} />
                <button type="submit">Add food</button>
            </form>
        ); 
    };
    
};

export default newFoodForm