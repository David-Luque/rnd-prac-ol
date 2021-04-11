import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchBar: ""
        }
    };

    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({ [name]: value });
        this.updateResults(this.state.searchBar);
    };

    updateResults = (search)=>{
        console.log(`state now: ${this.state.searchBar}`)
        this.props.showFoods(search)
    }

    render(){
        return(
            <input 
                type="text" 
                name="searchBar"
                value={this.state.seachBar} 
                onChange={(e)=>{this.handleChange(e)}}
            />
        );
    };

};

export default SearchBar;