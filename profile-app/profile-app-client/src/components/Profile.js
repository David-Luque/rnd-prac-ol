import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    
    state = {
        userInfo: null
    };

    service = new AuthService();

    componentDidMount = ()=>{
        this.searchUserInfo();
    };

    searchUserInfo = ()=>{
        this.service.loggedin()
        .then(responseFromApi => {
            //console.log(responseFromApi)
            this.setState({ userInfo: responseFromApi });
        })
        .catch(err => console.log(err))
    };

    handleFileUpload = (event)=>{
        const uploadData = new FormData();
        uploadData.append('image', event.target.files[0]);

        this.service.upload(uploadData)
        .then(response => {
            this.setState({ userInfo: {...this.state.userInfo, image: response.image_url} });
            const { username, course, campus, image } = this.state.userInfo;
            this.service.edit(username, course, campus, image)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        })
        .catch(err => {
            console.log("Error while uploading file: ", err)
        })
    };

    handleLogOut = ()=>{
        this.service.logout()
        .then(response => {
            //console.log(response);
            this.setState({ userInfo: null });
            this.props.getUserInfo(null);
            this.props.history.push("/");
        })
        .catch(err => console.log(err))
        
    };

    renderImage = ()=>{
        if(this.state.userInfo.image === ""){
            const defaultImage = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
            return defaultImage;
        } else {
            return this.state.userInfo.image
        }
    };    

    displayUserInfo = ()=>{
        return(
            <div>
                <div>
                    <h2>Profile page</h2>
                    <p>Username</p>
                    <p>{this.state.userInfo.username}</p>
                    <p>Campus</p>
                    <p>{this.state.userInfo.campus}</p>
                    <p>Course</p>
                    <p>{this.state.userInfo.course}</p>
                    <button onClick={()=>{this.handleLogOut()}} >Logout</button>
                </div>
                <div>
                    <img src={this.renderImage()} alt={this.state.userInfo.username} />
                    <input type="file" onChange={(e)=>{this.handleFileUpload(e)}}  />
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

export default withRouter(Profile);