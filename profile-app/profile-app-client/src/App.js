import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AuthService from './services/AuthService';

//TODO: probar a guardar imagen y que se rendericen ambas, tenga o no el user
// TODO: redirigir a profile
// TODO: ver por que el componente profile falla al cargar el state y no renderiza

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

  render(){
    this.fetchUser();
    return (
      <div className="App">
        <h2>Profile app</h2>
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/login"><button>Log in</button></Link>
        {this.state.loggedInUser && <Link to="/profile"><button>Your profile</button></Link> }

        <Switch>
          <Route exact path="/signup" render={()=> <Signup getUserInfo={this.getUserInfo} />} />
          <Route exact path="/login" render={()=> <Login getUserInfo={this.getUserInfo} />} />
          <Route exact path="/profile" render={()=> <Profile loggedUser={this.state.loggedInUser} />} />
        </Switch>
      </div>
    );
  };
  
}

export default App;
