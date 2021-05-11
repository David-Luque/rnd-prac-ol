import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../services/AuthService';


class logIn extends Component {    

    state = {
        username: "",
        password: ""
    };

    service = new AuthService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const { username, password } = this.state;
        this.service.login(username, password)
        .then(response => {
            this.setState({
                username: "",
                password: ""
            });
            this.props.getUserInfo(response);
            this.props.history.push("/profile");
        })
        .catch(err => console.log(err))
    };


    render(){
        return(
            <div>
                <h2>Log in</h2>
                <form onSubmit={this.handleFormSubmit} >
                    <label>Username</label><br />
                    <input type="text" name="username" value={this.state.username} onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Password</label><br />
                    <input type="password" name="password" value={this.state.password} onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <button>Log In</button>
                </form>
                <p>
                    If you don't have an account yet, you can create your account
                    <br />
                    <Link to="/signup">here</Link>
                </p>
            </div>
        );
    };
};

export default withRouter(logIn);