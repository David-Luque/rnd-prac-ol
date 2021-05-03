import React, { Component } from 'react';
import Header from './Header';
import ApiService from './Services/ApiService';

class newBeer extends Component {
    
    state = {
        name: "",
        tagline: "",
        description: "",
        first_brewed: "",
        brewers_tips: "",
        attenuation_level: "",
        contributed_by: ""
    };

    service = new ApiService();
    
    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const newBeer = {
            name: this.state.name,
            tagline: this.state.tagline,
            description: this.state.description,
            first_brewed: this.state.first_brewed,
            brewers_tips: this.state.brewers_tips,
            attenuation_level: this.state.attenuation_level,
            contributed_by: this.state.contributed_by
        };
        this.service.createBeer(newBeer)
        .then(response => {
            this.setState({
                name: "",
                tagline: "",
                description: "",
                first_brewed: "",
                brewers_tips: "",
                attenuation_level: "",
                contributed_by: ""
            });
            console.log(response)
        })
        .catch(err => console.log(err))

    };


    render(){
        return(
            <div>
                <Header/>
                <form onSubmit={this.handleFormSubmit} >
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Tagline</label>
                    <input type="text" name="tagline" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Description</label>
                    <textarea type="text" name="description" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>First brewed</label>
                    <input type="text" name="first_brewed" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Brewed tips</label>
                    <input type="text" name="brewers_tips" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Attenuation level</label>
                    <input type="number" name="attenuation_level" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Contributed by</label>
                    <input type="text" name="contributed_by" onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <button>ADD NEW</button>
                </form>
            </div>
        );
    };
};

export default newBeer;