import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AuthService from './services/AuthService';
import ProtectedRoute from './components/ProtectedRoute';


class App extends Component {

  state = {
    loggedInUser: null
  };

  service = new AuthService();

  fetchUser(){
    if(this.state.loggedInUser === null){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
  
  getUserInfo = (userInfo)=>{
    this.setState({ loggedInUser: userInfo });
  };

  renderButtons = ()=>{
    return(
      <div>
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/login"><button>Log in</button></Link> 
      </div>
    )
  };

  render(){
    this.fetchUser();
    return (
      <div className="App">
        <h2>Profile app</h2>
        <h3>Home</h3>
        {!this.state.loggedInUser && this.renderButtons()}
        {this.state.loggedInUser && <Link to="/profile"><button>Your profile</button></Link> }

        <Switch>
          <Route exact path="/signup" render={()=> <Signup getUserInfo={this.getUserInfo} />} />
          <Route exact path="/login" render={()=> <Login getUserInfo={this.getUserInfo} />} />
          <ProtectedRoute 
            user={this.state.loggedInUser} 
            path="/profile" 
            component={Profile}
            getUserInfo={this.getUserInfo}
          />
        </Switch>
      </div>
    );
  };
  
}

export default App;
