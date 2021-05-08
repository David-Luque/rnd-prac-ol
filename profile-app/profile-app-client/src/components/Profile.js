import React, { Component } from 'react';
import AuthService from '../services/AuthService';

class profile extends Component {
    
    state = {
        userInfo: null
    };

    service = new AuthService();

    componentDidMount = ()=>{
        this.setState({ userInfo: this.props.loggedUser });
    };

    handleFileUpload = (event)=>{
        const uploadData = new FormData();
        uploadData.append('image', event.target.files[0]);

        this.service.upload(uploadData)
        .then(response => {
            this.setState({ userInfo: {...this.state.userInfo, image: response.image_url} });
        })
        .catch(err => {
            console.log("Error while uploading file: ", err)
        })
    };

    handleLogOut = ()=>{
        this.service.logout();
        this.props.history.push("/");
    };

    renderDefaultImage = ()=>{
        const defaultImage = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
        return defaultImage;
    };    


    displayUserInfo = ()=>{
        return(
            <div>
                <div>
                    <h2>Profile</h2>
                    <p>Username</p>
                    <p>{this.state.username}</p>
                    <p>Campus</p>
                    <p>{this.state.campus}</p>
                    <p>Course</p>
                    <p>{this.state.course}</p>
                    <button>Logout</button>
                </div>
                <div>
                    <img
                        src={this.state.userInfo.image !== ""
                            ? this.state.userInfo.image
                            : this.renderDefaultImage()
                        }
                        alt={`${this.state.userInfo.username}`}
                    />
                    <input type="file" name="" onChange={(e)=>{this.handleFileUpload(e)}}  />
                </div>
            </div>
        );
    };
    
    render(){
        return(
            <div>
                {this.state.userInfo && this.displayUserInfo()}
            </div>
        );
    };
};

export default profile;