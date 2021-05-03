import axios from 'axios';

class ApiService {
    constructor(){
        let service = axios.create({
            baseURL: 'https://ih-beers-api2.herokuapp.com/beers',
            withCredentials: false
        });
        this.service = service
    };

    allBeers = ()=>{
        return this.service.get("/")
        .then(response => response.data)
    };

    beerDetails = (id)=>{
        return this.service.get(`/${id}`)
        .then(response => response.data)
    };

    randomBeer = ()=>{
        return this.service.get('/random')
        .then(response => response.data)
    };

    createBeer = (data)=>{
        return this.service.post('/new', data)
        .then(response => response.data)
    };

    foundBeers = (query)=>{
        return this.service.get(`/search?q=${query}`)
        .then(response => response.data)
    };

};

export default ApiService;