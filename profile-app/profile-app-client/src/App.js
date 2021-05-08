import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

class App extends Component {

  state = {
    loggedInUser: null
  };
  
  getUserInfo = (userInfo)=>{
    this.setState({ loggedInUser: userInfo });
  };

  render(){
    return (
      <div className="App">
        <h2>Profile</h2>
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/login"><button>Log in</button></Link>

        <Switch>
          <Route exact path="/signup" render={()=> <Signup getUserInfo={this.getUserInfo} />} />
          <Route exact path="/login" render={()=> <Login getUserInfo={this.getUserInfo} />} />
          <Route exact path="/profile" render={()=>{ <Profile loggedUser={this.state.loggedInUser} /> }} />
        </Switch>
      </div>
    );
  };
  
}

export default App;
