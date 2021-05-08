import React, { Component } from 'react';
import AuthService from '../services/AuthService';

class signUp extends Component {
    
    state = {
        username: "",
        password: "",
        course: "",
        campus: ""
    };

    service = new AuthService();
    
    hadleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const { username, password, course, campus } = this.state;
        this.service.signup(username, password, course, campus)
        .then(response => {
            this.setState({
                username: "",
                password: "",
                course: "",
                campus: ""
            });
            this.props.getUserInfo(response);
        })
        .catch(err => console.log(err))
    };
    
    render(){
        return(
            <div>
                <h2>Sign up</h2>
                <form onSubmit={(e)=>{this.handleFormSubmit(e)}} >
                    <label>Username</label><br />
                    <input type="text" name="username" value={this.state.username} onChange={(e)=>{this.hadleChange(e)}} />
                    <br /><br />
                    <label>Password</label><br />
                    <input type="password" name="password" value={this.state.password} onChange={(e)=>{this.hadleChange(e)}} />
                    <br /><br />
                    <label>Course</label><br />
                    <input type="text" name="course" value={this.state.course} onChange={(e)=>{this.hadleChange(e)}} />
                    <br /><br />
                    <label>Campus</label><br />
                    <input type="text" name="campus" value={this.state.campus} onChange={(e)=>{this.hadleChange(e)}} />
                    <br /><br />
                    <button>Create account</button>
                </form>
            </div>
        );
    };
};

export default signUp;