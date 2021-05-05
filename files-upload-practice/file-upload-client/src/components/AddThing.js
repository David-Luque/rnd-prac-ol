import React, { Component } from 'react';
import service from '../api/service';

class addThing extends Component {

    state = {
        name: "",
        description: "",
        imageUrl: ""
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        // const { name, description, imageUrl } = this.state;
        // const theNewThing = { name, description, imageUrl };
        service.saveNewThing(this.state)
        .then(response => {
            console.log('Successfully added: ', response);
            // here we would redirect to some other page
        })
        .catch(err => console.log('Error while adding the thing: ', err))
    };

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // this method handles just the file upload
    handleFileUpload = (e)=>{
        console.log('File to be uploaded: ', e.target.files[0])

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route

        uploadData.append('imageUrl', e.target.files[0]);

        service.handleUpload(uploadData)
        .then(response => {
            this.setState({ imageUrl: response.secure_url });
        })
        .catch(err => {
            console.log('Error while uploading file: ', err)
        })
    };




    render(){
        return(
            <div>
                <h2>New Thing</h2>
                <form onSubmit={(e)=>{this.handleFormSubmit(e)}} >
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <label>Description</label>
                    <textarea type="text" name="description" value={this.state.description} onChange={(e)=>{this.handleChange(e)}} />
                    <label>Image URL</label>
                    <input type="file" onChange={(e)=>{this.handleFileUpload(e)}} />
                    <button>Submit thing</button>
                </form>
            </div>
        );
    };
};

export default addThing;