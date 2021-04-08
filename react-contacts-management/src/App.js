import React, { Component } from "react";
import './App.css';
import contacts from './contacts.json';

//TODO: remove or avoid repeated contacts in "addContact()"
//TODO: apply styles


class App extends Component {
  
  constructor(){
    super();
    const initialContactsArray = contacts.slice(0, 5);
    this.state = {
      contacts: initialContactsArray
    }
  };

  generateRows = (array)=>{
    return array.map((elem) => {
      return(
        <tr key={elem.id}>
          <td> <img src={elem.pictureUrl} alt={elem.name}/> </td>
          <td>{elem.name}</td>
          <td>{(elem.popularity).toFixed(2)}</td>
          <td> <button onClick={()=>{this.deleteContact(elem.id)}}>Delete</button> </td>
        </tr>
      )
    });
  };

  addContact = ()=>{
    const savedContacts = [...this.state.contacts];
    // const allContacts = [...contacts];
    // savedContacts.forEach(contact => {
    //   allContacts.splice(X, 1)
    // })
    const randomNum = Math.floor(Math.random() * contacts.length);
    savedContacts.push(contacts[randomNum]);
    this.setState({contacts: savedContacts});
  };

  sortByName = ()=>{
    const savedContacts = [...this.state.contacts];
    savedContacts.sort((a, b)=>{
      const nameA = a.name
      const nameB = b.name
      if(nameA < nameB){return -1};
      if(nameA > nameB){return 1}
      return 0;
    });
    this.setState({contacts: savedContacts});
  };

  sortByPopularity = ()=>{
    const savedContacts = [...this.state.contacts];
    savedContacts.sort((a, b)=>{
      return b.popularity - a.popularity
    });
    this.setState({contacts: savedContacts});
  };

  deleteContact = (id)=>{
    const savedContacts = [...this.state.contacts];
    const filteredContacts = savedContacts.filter(contact => {
      return contact.id !== id
    });
    this.setState({contacts: filteredContacts});
  };

  render(){
    return (
      <div className="App">
        <h1>Contacts</h1>
        <div className='buttons'>
          <button onClick={()=>{this.addContact()}}>Add random contact</button>
          <button onClick={()=>{this.sortByName()}}>Sort by name</button>
          <button onClick={()=>{this.sortByPopularity()}}>Sort by popularity</button>
        </div>
        <div className='content'>
          <table>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.generateRows(this.state.contacts)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
}

export default App;
