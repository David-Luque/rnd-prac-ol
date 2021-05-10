import axios from 'axios';

class authService {
    constructor(){
        let service = axios.create({
            baseURL: "http://localhost:5000/api/auth",
            withCredentials: true
        });
        this.service = service;
    };

    signup = (username, password, course, campus)=>{
       return this.service.post('/signup', { username, password, course, campus })
        .then(response => response.data)
    };

    login = (username, password) => {
        return this.service.post('/login', {username, password})
        .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
        .then(response => response.data)
    }

    loggedin = ()=>{
        return this.service.get('/loggedin')
        .then(response => response.data)
    };

    edit = (username, course, campus, image)=>{
        return this.service.post('/edit', { username, course, campus, image })
        .then(response => response.data)
    };

    upload = (theFile)=>{
        return this.service.post('/upload', theFile)
        .then(response => response.data)
    };

};

export default authService;